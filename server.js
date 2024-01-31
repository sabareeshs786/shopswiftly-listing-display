require('dotenv').config();
const express = require('express');
const { userProductsDBConn } = require('./config/dbConnect');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const verifyRoles = require('./middleware/verifyRoles');
const ROLES_LIST = require('./config/roles_list');

const app = express();
const PORT = process.env.PORT || 3503;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', require('./routes/api/productsApi'));
app.use('/product', require('./routes/api/productApi'));

app.use(verifyJWT);

app.use(errorHandler);

Promise.all([
    new Promise(resolve => userProductsDBConn.once('connected', resolve))
])
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.log("Error in connecting");
    });