const path = require('path');
const express = require('express');
const expressRouter = express.Router();
const bodyParser = require('body-parser'); 
const configFile = require(path.resolve('./config/config'))[process.env.NODE_ENV];
const app = express();

// SETUP ALL CONFIGS IN ENV
const setupConfigs = function () {
    return new Promise((resolve) => {
        for (let key in configFile) {
            process.env[key] = configFile[key];
        }
        return resolve();
    });
}

// REGISTER ALL ROUTES 
const setupRoutes = function () {
    return new Promise((resolve, reject) => {
        const resisterRoutesPromise = require(path.resolve('./routes')).registerRoutes(expressRouter);
        resisterRoutesPromise.then((routerInstance) => {
            return resolve(routerInstance);
        }).catch((err) => {
            return reject(err);
        });
    });
}

// CONNECT TO SEQUELIZE DATABASE AND REGISTER ALL MODELS
const setupSequelize = function() {
    return new Promise((resolve, reject) => {
        require(path.resolve('./models/index'));
        return resolve();
    });
};

// INITIATE SERVER
const setupServer = function () {
    const setupConfigsPromise = setupConfigs();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    setupConfigsPromise.then(() => {
        const setupSequelizePromise = setupSequelize();
        setupSequelizePromise.then(() => {
            const setupRoutesPromise = setupRoutes();
            setupRoutesPromise.then((expressRouter) => {
                app.use('/', expressRouter);
                app.listen(process.env.server_port);
                console.log(`SERVER STARTED ON PORT ${process.env.server_port}!`);
            });
        });
       
    })
}

setupServer();