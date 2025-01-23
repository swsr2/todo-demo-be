const User = require('../model/User')
const userController = {}
const bcrypt = require('bcryptjs');
const saltRounds = 10

userController.createUser = async (req, res) => {
    try {
        // 정보를 body에서 가져온다
        const { email, name, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            throw new Error('이미 가입된 유저입니다.')
        }
        // 암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        // console.log("hash", hash)
        const newUser = new User({ email, name, password: hash })
        await newUser.save()
        res.status(200).json({ status: "success" })
    } catch (error) {
        res.status(400).json({ status: "fail", error })
    }
}


userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }, "-__v")
        if (user) {
            // 일반pw 와 암호화된pw 비교
            const isMath = bcrypt.compareSync(password, user.password)
            // 맞으면 토큰 발행 
            if (isMath) {
                const token = user.generateToken()
                return res.status(200).json({ status: "success", user, token })
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }

}
// 유저 가져오기
userController.getUser = async (req, res) => {
    try {
        const { userId } = req;

        // userId가 없는 경우 에러 반환
        if (!userId) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: No user ID found in request",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Cannot find user");
        }

        res.status(200).json({ status: "success", user });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};
module.exports = userController;