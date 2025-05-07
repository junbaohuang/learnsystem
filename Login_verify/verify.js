const express = require('express');
const router = express.Router();

// 处理 /verify 路径的 POST 请求
router.post('/', (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;
    // 此处可添加具体验证逻辑（如与数据库比对）
    console.log('收到用户名：', username);
    console.log('收到密码：', password);
    res.send('登录信息已接收，正在验证...');
});

module.exports = router;
