const jwt = require("jsonwebtoken")
const UsersModel = require("../Models/UsersModel");
require('dotenv').config();

const checkUser = async (req, res, next) => {
    var token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token);
            const user = await UsersModel.findById({ _id: decoded.id })
            const { password, createdAt, updatedAt, ...others } = user._doc;
            req.user = others;
            next();

        } catch (error) {
            res.status(400).json({ message: "User not authorized" })
        }
    }
    else {
        res.status(400).json({ message: "User not authorized" })
    }
}


module.exports = { checkUser }