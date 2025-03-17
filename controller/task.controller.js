const Task = require("../model/Task")
const taskController = {}

// 생성
taskController.createTask = async (req, res) => {
    try {
        // 프론트에서 불러오기기
        const { task, isComplete } = req.body;
        const { userId } = req
        // 새로운 모델 만들기
        const newTask = new Task({ task, isComplete, author: userId })
        // 저장하기 
        await newTask.save()
        // 데이터 보내기 - 유저가 볼수 있게게
        res.status(200).json({ status: 'ok', data: newTask })
    } catch (error) {
        res.status(400).json({ status: 'fail', error: error })
    }
}
// 리스트가져오기
// taskController.getTask = async (req, res) => {
//     try {
//         // 리스트 가져오기
//         // ,populate - 조인(외래키사용)
//         const taskList = await Task.find({}).populate("author")
//         // 리스트 보여주기
//         res.status(200).json({ status: 'ok', data: taskList })
//     } catch (error) {
//         res.status(400).json({ status: 'fail', error: error })
//     }
// }
taskController.getTask = async (req, res) => {
    try {
        // 데이터 조회 및 populate 수행
        const taskList = await Task.find({})
            .populate("author") // author가 ObjectId 필드라면 제대로 동작함
            .lean(); // .lean()을 추가하여 JSON 형태로 반환

        console.log("MongoDB에서 가져온 데이터:", taskList); //  데이터 확인용 로그 추가

        if (taskList.length === 0) {
            console.warn("MongoDB에 저장된 데이터가 없습니다.");
        }

        // 리스트 반환
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (error) {
        console.error("getTask 오류:", error);
        res.status(500).json({ status: 'fail', error: error.message });
    }
};

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
