// Student/student.js
const express = require('express');
const router = express.Router();

// ✅ 使用全局连接池
const pool = require('../global/mysqldb');

// 首页展示静态学生信息（可以留作示例）
router.get('/', (req, res) => {
    const student = {
        name: '王五',
        age: 21,
        score: 88
    };
    res.render('student', { student });
});

// 根据学号获取真实学生信息
router.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM student WHERE sId = ?',
            [studentId]
        );

        if (rows.length > 0) {
            const student = rows[0];
            res.send(`学号：${student.sId}，姓名：${student.sName}，成绩：${student.sScore}`);
        } else {
            res.status(404).send('未找到该学号对应的学生信息');
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('服务器内部错误');
    }
});

module.exports = router;