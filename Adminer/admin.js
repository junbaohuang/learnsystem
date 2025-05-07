const express = require('express');
const adminRouter = express.Router();

// 模拟管理员数据
const admins = [
    { id: 1, name: 'Admin1', email: 'admin1@example.com' },
    { id: 2, name: 'Admin2', email: 'admin2@example.com' }
];

// 获取所有管理员
adminRouter.get('/', (req, res) => {
    res.json(admins);
});

// 根据 ID 获取单个管理员
adminRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const admin = admins.find(a => a.id === id);
    if (admin) {
        res.json(admin);
    } else {
        res.status(404).send('管理员未找到');
    }
});

// 添加新管理员
adminRouter.post('/', (req, res) => {
    const newAdmin = {
        id: admins.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    admins.push(newAdmin);
    res.status(201).json(newAdmin);
});

// 更新管理员信息
adminRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const adminIndex = admins.findIndex(a => a.id === id);
    if (adminIndex!== -1) {
        admins[adminIndex] = {
            id: id,
            name: req.body.name || admins[adminIndex].name,
            email: req.body.email || admins[adminIndex].email
        };
        res.json(admins[adminIndex]);
    } else {
        res.status(404).send('管理员未找到');
    }
});

// 删除管理员
adminRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const adminIndex = admins.findIndex(a => a.id === id);
    if (adminIndex!== -1) {
        const deletedAdmin = admins.splice(adminIndex, 1);
        res.json(deletedAdmin[0]);
    } else {
        res.status(404).send('管理员未找到');
    }
});

module.exports = adminRouter;
    