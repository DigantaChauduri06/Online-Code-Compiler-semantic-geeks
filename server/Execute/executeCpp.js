const { exec } = require("child_process")
const path = require("path")
const fs = require("fs")

const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}

const executeCpp = (filepath) => {
    const jobid = path.basename(filepath).split(".")[0]
    const outPath = path.join(outputPath, `${jobid}.out`)
    console.log(`g++ ${filepath} -o ${outPath} && ./Execute/outputs/${jobid}.out`)
    return new Promise((res, rej) => {
        exec(`g++ ${filepath} -o ${outPath} && ./Execute/outputs/${jobid}.out`, (err, stdout, stderr) => {
            if (err) {
                rej({ error: err, })
            }
            if (stderr) {
                rej(stderr)
            }
            else
                res(stdout)
        })
    })
}

module.exports = {
    executeCpp
}