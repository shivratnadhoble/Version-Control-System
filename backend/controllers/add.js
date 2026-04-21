const fs = require("fs").promises;
const path = require("path");


async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stragingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stragingPath, { recursive: true });
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stragingPath, fileName));
        console.log(`File ${fileName} added to the staging area!`);
    } catch (err) {
        console.error("Error adding file : ", err);
    }
}

module.exports = { addRepo };