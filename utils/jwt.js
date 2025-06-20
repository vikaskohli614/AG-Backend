const token =require('jsonwebtoken');
require("dotenv").config();
const generateToken = (id) => {
    return token.sign({id}, process.env.JWTSECRET);
}
module.exports = generateToken; 