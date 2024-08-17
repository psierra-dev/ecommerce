"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const errorhandler_1 = __importDefault(require("errorhandler"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const logger_1 = __importDefault(require("./shared/utils/logger"));
const routes_1 = require("./api/routes");
const errorHandler_1 = require("./api/middleware/errorHandler");
class Server {
    constructor(port) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use((0, cors_1.default)());
        this.express.use((0, body_parser_1.json)());
        this.express.use((0, body_parser_1.urlencoded)({ extended: true }));
        const router = (0, express_promise_router_1.default)();
        //Usar solo en desarrollo
        router.use((0, errorhandler_1.default)());
        this.express.use(router);
        router.use("/api/v1", router);
        (0, routes_1.registerRoutes)(router);
        router.use(errorHandler_1.logErrors);
        router.use(errorHandler_1.ormErrorHandler);
        router.use(errorHandler_1.boomErrorHandler);
        router.use(errorHandler_1.errorServer);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.httpServer = this.express.listen(this.port, () => {
                    logger_1.default.info(`server listening in port ${this.port}`);
                    resolve();
                });
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close(error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve();
                    });
                }
                resolve();
            });
        });
    }
}
exports.Server = Server;
