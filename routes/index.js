const express = require('express');
const router = express.Router()
const taskApi = require('./task.api')

// 라우터 설정
router.use('/tasks', taskApi)
// 예) router.use('/user', userApi) 같이 여러개있을수도 있음

module.exports = router