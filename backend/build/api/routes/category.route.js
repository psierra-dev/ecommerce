"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const typedi_1 = require("typedi");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const routePrivate_1 = require("../middleware/routePrivate");
const validateRole_1 = __importDefault(require("../middleware/validateRole"));
const register = (router) => {
    const categoryController = typedi_1.Container.get(CategoryController_1.default);
    router.post("/categories", (0, routePrivate_1.routePrivate)(), (0, validateRole_1.default)('admin'), categoryController.create);
    router.post("/categories/bulk", (0, routePrivate_1.routePrivate)(), (0, validateRole_1.default)('admin'), categoryController.bulkCreate);
    router.get("/categories", categoryController.getAll);
    router.get("/categories/:id", categoryController.getOneById);
    router.delete("/categories/:id", (0, routePrivate_1.routePrivate)(), (0, validateRole_1.default)('admin'), categoryController.deleteOneById);
};
exports.register = register;
