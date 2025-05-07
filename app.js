const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
const app = express();
const secretKey = 'yourSecretKey';

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

// 解析 JSON 数据
app.use(bodyParser.json());
// 解析表单数据
app.use(bodyParser.urlencoded({ extended: true }));
// 解析 Cookie
app.use(cookieParser());
// 设置视图引擎为 EJS
app.set('view engine', 'ejs');
// 设置视图文件的目录
app.set('views', './views');

// 全局中间件，用于检查 JWT 令牌
const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Received token:', token);

    if (!token) {
        console.log('No token provided, redirecting to login');
        return res.redirect('/login');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err.name, err.message);
            return res.redirect('/login');
        }
        console.log('Token verified successfully:', decoded);
        req.user = decoded;
        next();
    });
};

// 引入并挂载路由模块
const studentRouter = require('./Student/student.js');
const adminerRouter = require('./Adminer/admin.js');
const teacherRouter = require('./Teacher/teacher.js');
const loginRouter = require('./Login_verify/login.js')(pool, secretKey);

// 登录路由不需要进行登录验证
app.use('/login', loginRouter);

// 其他路由需要进行登录验证
app.use(checkLogin);
app.use('/student', studentRouter);
app.use('/admin', adminerRouter);
app.use('/teacher', teacherRouter);

// 定义首页路由
app.get('/', (req, res) => {
    res.redirect('/login');
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行中：http://localhost:${port}`);
});
    