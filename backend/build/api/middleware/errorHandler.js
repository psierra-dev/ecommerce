"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrors = logErrors;
exports.errorServer = errorServer;
exports.boomErrorHandler = boomErrorHandler;
exports.ormErrorHandler = ormErrorHandler;
const sequelize_1 = require("sequelize");
function logErrors(err, req, res, next) {
    console.log('errorLog');
    next(err);
}
function errorServer(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
        return;
    }
    next(err);
}
function ormErrorHandler(err, req, res, next) {
    if (err instanceof sequelize_1.ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors,
        });
        return;
    }
    next(err);
}
