const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();

// MongoDB 연결 URI 출력
// console.log("MongoDB URI:", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;

// bodyParser: 프론트엔드로부터 요청의 body를 JSON -> 객체 형태로 변환
app.use(bodyParser.json());
app.use(cors());

// 라우터 설정
app.use("/api", indexRouter);

// MongoDB 연결
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('DB Connection Error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB 연결 중 오류 발생:', err);
});
// Heroku에서 제공하는 PORT 사용, 기본값은 5000
const PORT = process.env.PORT || 5000;

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
