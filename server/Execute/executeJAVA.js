const path = require("path")
const { exec } = require("child_process")
const fs = require("fs")

const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}
const executeJava = (filepath) => {
    const jobid = path.basename(filepath).split(".")[0]
    const classOutput = outputPath.split("/").join("/")
    console.log("class Output", classOutput);
    console.log(`javac ${filepath} && cd ./codes && java Main`);
    path.join(outputPath, `Main.class`)

    return new Promise((resolve, reject) => {
        // console.log("YES......")
        exec(`javac ${filepath} -d ${classOutput} && cd ${classOutput} && java Main`, (err, stdout, stderr) => {
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
    executeJava
}