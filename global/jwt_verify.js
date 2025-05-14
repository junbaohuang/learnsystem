// global/jwt_verify.js
const jwt = require('jsonwebtoken');

module.exports = (secretKey) => {
    return (req, res, next) => {
        const token = req.cookies.token;

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
};