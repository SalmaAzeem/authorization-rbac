const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
    } catch (error) {
        console.error("connection to database failed: ", error);
        process.exit(1);
    }
};

module.exports = connection;