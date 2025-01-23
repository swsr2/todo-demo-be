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
    },
    author: {
        type: Schema.Types.ObjectId, // id만 받아옴
        required: true,
        ref: "User" // User 모델을 참조할것임
    }
}, { timestamps: true })

// 실제 데이터가들어가는 모델
const Task = mongoose.model('Task', taskSchema)

module.exports = Task;