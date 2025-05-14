
//载入需要的模块
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const secretKey = 'klajdfnkjdfnvnr'; 

// ✅ 引入全局中间件,数据库,jwt验证
const pool = require('./global/mysqldb');
const authMiddleware = require('./global/jwt_verify')(secretKey);

// 设置静态资源目录,设置esj,ejs位置
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');

// 解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 解析 Cookie
app.use(cookieParser());


// 路由引入并挂载
const loginRouter = require('./Login_verify/login')(secretKey);
const studentRouter = require('./Student/student');
const adminerRouter = require('./Adminer/admin');
const teacherRouter = require('./Teacher/teacher');
app.use('/login', loginRouter);
app.use(authMiddleware); 
app.use('/student', studentRouter);
app.use('/admin', adminerRouter);
app.use('/teacher', teacherRouter);

// 首页重定向到登录
app.get('/', (req, res) => {
    res.redirect('/login');
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行中：http://localhost:${port}`);
});