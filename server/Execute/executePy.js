const path = require("path")
const { exec } = require("child_process")
const fs = require("fs")

const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}
const executePy = (filepath) => {
    const jobid = path.basename(filepath).split(".")[0]
    const classOutput = outputPath.split("/").join("/")
    console.log("class Output", classOutput);
    path.join(outputPath, `Main.class`)

    return new Promise((resolve, reject) => {
        exec(`python3.10 ${filepath}`, (err, stdout, stderr) => {
            if (err) {
                reject({ error: err, })
            }
            if (stderr) {
                reject(stderr)
            }
            else
                resolve(stdout)
        })
    })
}
module.exports = {
    executePy
}