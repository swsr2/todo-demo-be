const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 데이터 형태(스키마)
const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true })

// 실제 데이터가들어가는 모델
const Task = mongoose.model('Task', taskSchema)

module.exports = Task;