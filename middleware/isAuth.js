const jwt = require('jsonwebtoken');
const db = require("../models");
const Member = db.member;
const {
    ACCESS_KEY
} = process.env

module.exports = async (req, res, next) => {
  try {
    const token = req.get('x_auth');
    const decodedToken = jwt.verify(token, ACCESS_KEY);
    const {username } = decodedToken;
    const rows = await Member.findOne({username});
    if(!rows){
        return false;
    }
    next();
  } catch (err) {
    next(err);
  }
};
