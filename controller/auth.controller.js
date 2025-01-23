const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;

        // 토큰이 없으면 에러 반환
        if (!tokenString) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token: No token provided",
            });
        }

        // Bearer 토큰에서 "Bearer " 제거
        const token = tokenString.replace("Bearer ", "");

        // 토큰 검증 (Promise 기반으로 처리)
        const payload = await jwt.verify(token, JWT_SECRET_KEY);

        // payload에서 userId 설정
        console.log("Payload:", payload);
        req.userId = payload?._id || null;

        if (!req.userId) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token: User ID not found in payload",
            });
        }

        // 인증 성공 시 다음 미들웨어로 이동
        next();
    } catch (error) {
        // 에러 로그 출력
        console.error("Authentication Error:", error);

        // JWT 에러 처리
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token: " + error.message,
            });
        }

        // 기타 서버 에러 처리
        res.status(500).json({
            status: "fail",
            message: "Server error: " + error.message,
        });
    }
};

module.exports = authController;
