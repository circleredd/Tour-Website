const express = require('express');
const morgan = require('morgan');

const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use((req, res, next) => {
    console.log('This is the middleware🖥️🖥️🖥️');
    next();
});

// 2) Route handlers

// 3) Routes

//middleware of creating sub route
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
// 4) Start Server

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id/:optional?', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
