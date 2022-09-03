const path = require("path")
const fs = require("fs")
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, "codes")
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true })
}

const genarateCode = async (format, code) => {
    const id = uuid()
    let fileName = `${id}.${format}`
    if (format === 'java') {
        fileName = "Main.java"
    }
    const filePath = path.join(dirCodes, fileName)
    await fs.writeFileSync(filePath, code)
    return filePath
}

module.exports = {
    genarateCode
}