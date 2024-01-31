require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = (dbUri) => {
    try {
        const connection = mongoose.createConnection(dbUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true
        });
        connection.on('error', (err) => {
            console.log(err);
        });
        return connection;
    } catch (err) {
        console.error(err);
    }
};

const userProductsDBConn = connectDB(process.env.DATABASE_URI_USER_PRODUCTS);

module.exports = { userProductsDBConn };