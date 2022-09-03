const mongoose = require('mongoose');


const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connection to mongoDB successful');
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = connectDB;