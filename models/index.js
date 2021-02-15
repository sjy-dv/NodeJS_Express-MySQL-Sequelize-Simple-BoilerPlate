const { Sequelize, DataTypes, Op }= require('sequelize');

const {
    MYSQL_DB,
    MYSQL_DB_USER,
    MYSQL_DB_PASSWORD,
    MYSQL_DB_HOST
} = process.env ;

const sequelize = new Sequelize(
    MYSQL_DB,
    MYSQL_DB_USER,
    MYSQL_DB_PASSWORD,
    {
        host : MYSQL_DB_HOST,
        dialect : 'mysql',
        operatorsAliases : false,
        
        pool : {
            max : 5,
            min : 0,
            idle : 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.member = require('./member.js')(sequelize, Sequelize, DataTypes);

module.exports = db;