const express = require('express');
const teacherRouter = express.Router();

teacherRouter.get('/', (req, res) => {
    res.send('教师页面');
});

module.exports = teacherRouter;
