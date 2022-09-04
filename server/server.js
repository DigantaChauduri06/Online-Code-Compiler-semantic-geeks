const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const { genarateCode } = require('./Execute/genrateFile')
const { executeCpp } = require("./Execute/executeCpp")
const { executeJava } = require("./Execute/executeJAVA")
const { executePy } = require('./Execute/executePy')
const { executeC } = require('./Execute/executeC')
const { executeJS } = require('./Execute/executeJS')

const userRoutes = require('./routes/userRoutes');

const connectDB = require('./db/connect');

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*"
}))

app.use('/api/v1', userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
app.post("/code", async (req, res) => {
    const { language = "cpp", code } = req.body
    console.log(language, code);
    if (code === undefined) {
        res.status(400).json({ message: "Empty code body" })
        return
    }
    try {
        const filePath = await genarateCode(language, code)
        let fileOutput = ""
        if (language.toLowerCase() === "c++" || language.toLowerCase() === 'cpp') {
            fileOutput = await executeCpp(filePath)
        }
        else if (language.toLowerCase() === 'java') {
            fileOutput = await executeJava(filePath)
        }
        else if (language.toLowerCase() === 'py') {
            fileOutput = await executePy(filePath)
        }
        else if (language.toLowerCase() === 'c') {
            fileOutput = await executeC(filePath)
        }
        else if (language.toLowerCase() === 'js') {
            fileOutput = await executeJS(filePath)
        }
        return res.json({ message: "Success", language, code, fileOutput, filePath })

    } catch (e) {
        return res.status(500).json({ message: "Error Happend", e })
    }
})
