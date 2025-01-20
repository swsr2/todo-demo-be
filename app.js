const mongoose = require('mongoose')
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const cors = require('cors')
const app = express()
console.log("MongoDB URI:", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;

// bodyParsor: 프론트엔드로부터 req를 받는데 http의 body를 json 을 object 형태로 바꿔주는 역할 한다. 
app.use(bodyParser.json())
app.use(cors());
app.use("/api", indexRouter)


mongoose.connect(mongoURI).then(() => console.log('MongoDB Connected')).catch(err => console.error('DB Connection Error:', err));


app.listen(5000, () => {
    console.log("server on 5000")
})


