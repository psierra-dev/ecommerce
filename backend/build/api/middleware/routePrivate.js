"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePrivate = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const JwtService_1 = require("@/shared/services/JwtService");
const routePrivate = () => ((req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        try {
            const decode = new JwtService_1.JwtService().verifyToken(token);
            req.user = decode.data;
            next();
        }
        catch (error) {
            next(boom_1.default.unauthorized("Token invalid"));
        }
    }
    else {
        next(boom_1.default.unauthorized("Token not provided"));
    }
});
exports.routePrivate = routePrivate;
