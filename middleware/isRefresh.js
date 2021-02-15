const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/jwt');
const db = require("../models");
const Member = db.member;

const {
    ACCESS_KEY,
    REFRESH_KEY
} = process.env;

module.exports = async (req, res, next) => {
  try {
    const refreshtoken = req.get('r_x_auth');

    if (!refreshtoken) {
      return false;
    }

    const decodedToken = jwt.verify(refreshtoken, REFRESH_KEY);
    const {username} = decodedToken;
    const rows = await Member.findOne({username});
    if(rows){
        const newtoken = createToken(rows[0].username);
        res.send(newtoken);
    }else{
        return false;
    }
  } catch (err) {
    next(err);
  }
};
