const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router()


// router.post('/', (req, res) => {
//     res.send('create task')
// })

router.post('/', authController.authenticate, taskController.createTask)

router.get('/', taskController.getTask)

router.put('/:id', taskController.modifiedTask);


router.delete('/:id', taskController.deleteTask)

module.exports = router