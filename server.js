const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! 💥 Shtting down...');

    process.exit(1);
});

//The configuration of 'dotenv' should be completed before app is imported and started.
//This is because its primary purpose is to load environment variables from a configuration file for use by the application upon startup.
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
// const port = 3000;

const server = app.listen(port, () => {
    console.log(`App running on the port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log('UNHANDLER REJECTION! 💥 Shtting down...');
    server.close(() => {
        process.exit(1);
    });
});
