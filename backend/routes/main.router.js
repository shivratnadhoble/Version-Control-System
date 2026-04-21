const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRoute = require("./issue.router");

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRoute);

mainRouter.get("/", (req, res) => {
    res.send("Welcome!");
});

module.exports = mainRouter;