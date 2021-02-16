const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();
const port = process.env.PORT || 8081 ;
const router = require('./routes');


app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended : false }));
app.use('/user', router.userRouter);

const db = require('./models');

(async () => {
await db.sequelize.sync({ force : false });
})();

app.listen(port, () => {
    console.log(`server on ${port}`);
})