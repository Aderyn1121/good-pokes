const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { environment } = require('./config');
const userRouter = require('./routes/user');
const authRouter = require('./routes/userAuth');
const reviewRouter = require('./routes/reviews');
const indexRouter = require('./routes/index');

const path = require('path')
const app = express();

const origin = process.env.FRONTEND_URL;
app.use(cors({ origin }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded())

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/reviews', reviewRouter);
app.use('/', authRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    err.errors = ['Could not find string of resource'];
    next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === 'production';
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
