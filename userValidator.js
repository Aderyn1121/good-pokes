//Validate user for sign-up
const { check } = require('express-validator');
const { User } = require('./db/models/');

const validateUser = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email.')
        .isLength({ max: 100 })
        .withMessage('Email address must not be more than 100 characters long.')
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then((user) => {
                if (user) {
                    return Promise.reject(
                        'The provided Email Address is already in use by another account'
                    );
                }
            });
        }),
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field user name')
        .custom((value) => {
            return User.findOne({ where: { userName: value } }).then((user) => {
                if (user) {
                    return Promise.reject(
                        'The provided username is already in use by another account'
                    );
                }
            });
        }),
    check('birthday')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field birthday')
        .isISO8601()
        .withMessage('Please provide a valid date for birthday'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage(
            'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
        ),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password'),
    check('pronouns')
        .exists({ checkFalsy: true })
        .withMessage('Please input your pronouns.')
        .isLength({ max: 20 })
        .withMessage('Please limit your pronouns to 20 characters.')
];

//Validate email and password for login
const validateEmailAndPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email.')
        .isLength({ max: 100 })
        .withMessage('Email address must not be more than 100 characters long.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field password.'),
];


module.exports = { validateUser, validateEmailAndPassword };
