const Task = require("../model/Task")
const taskController = {}

// 생성
taskController.createTask = async (req, res) => {
    try {
        // 프론트에서 불러오기기
        const { task, isComplete } = req.body;
        // 새로운 모델 만들기
        const newTask = new Task({ task, isComplete })
        // 저장하기 
        await newTask.save()
        // 데이터 보내기 - 유저가 볼수 있게게
        res.status(200).json({ status: 'ok', data: newTask })
    } catch (error) {
        res.status(400).json({ status: 'fail', error: error })
    }
}
// 리스트가져오기 
taskController.getTask = async (req, res) => {
    try {
        // 리스트 가져오기 
        const taskList = await Task.find({})
        // 리스트 보여주기 
        res.status(200).json({ status: 'ok', data: taskList })
    } catch (error) {
        res.status(400).json({ status: 'fail', error: error })
    }
}
// 수정 
taskController.modifiedTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("App can not find the task");
        }
        // 필드 가져오기 - task, isComplete
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: "success", data: task });
    } catch (error) {
        res.status(400).json({ status: "fail", error });
    }
};
// 삭제 
taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "success", data: deleteItem });
    } catch (error) {
        res.status(400).json({ status: "fail", error });
    }
};


module.exports = taskController;
