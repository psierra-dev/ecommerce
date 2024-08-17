"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
function registerRoutes(router) {
    const routes = glob_1.glob.sync(`${__dirname}/**/*route.js`);
    routes.map(route => register(route, router));
}
function register(routePath, router) {
    const fullPath = path_1.default.resolve(routePath);
    const { register } = require(fullPath);
    register(router);
}
