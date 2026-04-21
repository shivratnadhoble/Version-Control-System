const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const mainRouter = require("./routes/main-router");
const { swaggerSpec } = require("./config/swagger");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

dotenv.config();

// ================= CLI COMMANDS =================
yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialise a new repository", {}, initRepo)
    .command(
        "add <file>",
        "Add a file to the repository",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to add to the staging area",
                type: "string",
            });
        },
        (argv) => {
            addRepo(argv.file);
        }
    )
    .command(
        "commit <message>",
        "Commit the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string",
            });
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits from S3", {}, pullRepo)
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "Commit ID to revert to",
                type: "string",
            });
        },
        (argv) => {
            revertRepo(argv.commitID);
        }
    )
    .demandCommand(1, "You need at least one command")
    .help().argv;


// ================= SERVER =================
async function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    // ===== ENV VALIDATION =====
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is missing in .env");
        process.exit(1);
    }

    // ===== MIDDLEWARE =====
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
        hsts: process.env.NODE_ENV === "production",
    }));

    // ===== RATE LIMITERS =====
    const globalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests, try again later",
    });

    app.use(globalLimiter);

    const authLimiter = rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 20,
        message: "Too many auth attempts, try later",
    });

    app.use("/signup", authLimiter);
    app.use("/login", authLimiter);

    // ===== DATABASE CONNECTION =====
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(" MongoDB Connected");
    } catch (err) {
        console.error(" DB Connection Failed:", err.message);
        process.exit(1);
    }

    // DB error listener (YOU MISSED THIS)
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB runtime error:", err);
    });

    // ===== CORS =====
    const corsOptions = {
        origin: process.env.NODE_ENV === "production" 
            ? process.env.ALLOWED_ORIGINS?.split(",") || false 
            : ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
        credentials: true,
        optionsSuccessStatus: 200
    };
    app.use(cors(corsOptions));

    // ===== ROUTES =====
    app.use("/", mainRouter);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/", (req, res) => {
        res.send("Welcome");
    });

    // ===== SOCKET.IO =====
    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
        cors: corsOptions,
        pingTimeout: 60000,
        pingInterval: 25000,
    });

    io.engine.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinRoom", (room) => {
            if (typeof room === "string" && room.length > 0 && room.length <= 50) {
                socket.join(room);
                console.log(`User joined room: ${room}`);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    // ===== START SERVER =====
    httpServer.listen(port, () => {
        console.log(`Server running on PORT ${port}`);
    });
}
