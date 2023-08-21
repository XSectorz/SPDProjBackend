const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected:", mongoose.connection.host, mongoose.connection.name);
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
}

module.exports = connectDb;
