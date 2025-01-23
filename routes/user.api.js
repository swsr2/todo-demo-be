const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')

// 회원가입
router.post('/', userController.createUser)

// 로그인 - id & pw는 url에 넣을 수 없으니 req.body에 넣어줘야 한다 그렇기 때문에 get이 아닌 post를 사용한다. 
router.post('/login', userController.loginWithEmail)


// 토큰을 통해 유저 id 빼내고, 그 아이디로 유저객체 찾아서 보내주기
router.get('/me', authController.authenticate, userController.getUser)

module.exports = router