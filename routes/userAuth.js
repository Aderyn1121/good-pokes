const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator')

const {
    asyncHandler,
    handleValidationErrors,
} = require('../utils');

const { validateUser, validateEmailAndPassword } = require('../userValidator');

const { getUserToken } = require('../auth');
const { User } = require('../db/models');

const router = express.Router();

router.post('/sign-up',
    validateUser,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        
        let { email, password, confirmPassword, userName, birthday, pronouns, starter } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            email,
            hashedPassword,
            userName,
            birthday,
            pronouns,
            collection: [starter],
            friends: [1],
            groups: [0]
        });

        const token = getUserToken(user)

        res.status(201).json({
            user: { id: user.id },
            token,
        })
    }));

//login
router.post('/login', validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.validatePassword(password)) {
        const err = new Error('Login Failed');
        err.status = 404;
        err.title = 'Login failed';
        err.errors = ['The provided login information was invalid'];
        return next(err);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
}))


module.exports = router;
