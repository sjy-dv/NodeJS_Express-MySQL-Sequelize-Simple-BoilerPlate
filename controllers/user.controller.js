const db = require("../models");
const Member = db.member;
const { createToken, createRefreshToken } = require("../utils/jwt");
const { generateHash, compareHash } = require("../utils/hash");
module.exports = (function(){

    const U = {};

    U.UserJoin = async (req,res) => {
        try {
            let { username, password } = req.body;
            let userpassword = generateHash(password);
            console.log(userpassword.hashpw);
            let user = await Member.create({username:username, password:userpassword.hashpw});
            res.status(200).send(user);
        } catch (error) {
            throw res.send('DB ERROR');
        }
    }

    U.UserLogin = async (req,res) => {
        try {
            let { username, password } = req.body;
            let check = await Member.findOne({username});
            let checking = compareHash(password, check.password);
            if(checking){
                const token = createToken(check.username);
                const retoken = createRefreshToken(check.username);
                res.send([token, retoken]);
            }else{
                throw res.send('PASSWORD WRONG');
            }
        } catch (error) {
            console.log(error);
            throw res.send('DB ERROR');            
        }
    }

    U.AuthTest = async function(req,res){
        try {
            res.send('auth token check ok');
        } catch (error) {
            throw res.send("DB ERROR");
        }
    }
    return U;
})()