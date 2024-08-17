"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const typedi_1 = require("typedi");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const routePrivate_1 = require("../middleware/routePrivate");
const register = (router) => {
    const userController = typedi_1.Container.get(UserController_1.default);
    router.post("/auth/signup", userController.signUp);
    router.post("/auth/signin", userController.signIn);
    router.get("/auth/profile", (0, routePrivate_1.routePrivate)(), userController.currentUser);
};
exports.register = register;
