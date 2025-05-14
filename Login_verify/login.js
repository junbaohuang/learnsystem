// Login_verify/login.js
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (secretKey) => {
    const router = express.Router();

    // 渲染登录页面
    router.get('/', (req, res) => {
        res.render('login');
    });

    // 处理登录请求
    router.post('/', async (req, res) => {
        const { sId, passwd } = req.body;

        try {
            const pool = require('../global/mysqldb'); // ✅ 使用全局连接池
            const [rows] = await pool.execute(
                'SELECT * FROM student WHERE sId = ? AND passwd = ?',
                [sId, passwd]
            );

            if (rows.length > 0) {
                const user = { sId: rows[0].sId };
                const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'lax' });
                res.redirect(`/student/${user.sId}`);
            } else {
                res.send('账号或密码错误');
            }
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).send('服务器内部错误');
        }
    });

    return router;
};