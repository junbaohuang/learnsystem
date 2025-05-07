const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learnsystem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// 路由对象要做的事情
router.get('/', (req, res) => {
    const student = {
        name: '王五',
        age: 21,
        score: 88
    };
    res.render('student', { student });
});

// 添加动态路由，根据学号获取学生信息
router.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    try {
        // 执行 SQL 查询
        const [rows] = await pool.execute('SELECT * FROM student WHERE sId = ?', [studentId]);
        if (rows.length > 0) {
            const student = rows[0];
            res.send(`学号：${student.sId}，姓名：${student.sName}，成绩：${student.sScore}`);
        } else {
            res.status(404).send('未找到该学号对应的学生信息');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('服务器内部错误');
    }
});

// 导出路由
module.exports = router;
    