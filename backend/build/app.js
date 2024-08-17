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
exports.EcommerceApp = void 0;
require("reflect-metadata");
//import sequelize from './providers/database/models';
const server_1 = require("./server");
const models_1 = __importDefault(require("./shared/infrastructure/orm/models"));
const logger_1 = __importDefault(require("./shared/utils/logger"));
class EcommerceApp {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.PORT || "3001";
            require('./shared/utils/dependencyinjection').default({ models: models_1.default.models });
            this.server = new server_1.Server(port);
            yield models_1.default.authenticate();
            logger_1.default.info("injection");
            return this.server.listen();
        });
    }
    get httpServer() {
        var _a;
        return (_a = this.server) === null || _a === void 0 ? void 0 : _a.getHTTPServer();
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.server) === null || _a === void 0 ? void 0 : _a.stop();
        });
    }
}
exports.EcommerceApp = EcommerceApp;
