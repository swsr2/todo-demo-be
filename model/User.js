const mongoose = require('mongoose')
const Schema = mongoose.Schema
var jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamp: true })

// object를 json으로 바꿀때 데이터내 패스워드 빼고 보냄 
userSchema.methods.toJSON = function () {
    // return this
    const obj = this._doc
    delete obj.password
    return obj
}
// 토큰 생성
userSchema.methods.generateToken = function () {
    // id를 확인해서 시크릿키 생성
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    return token;
}
const User = mongoose.model("User", userSchema);

module.exports = User;