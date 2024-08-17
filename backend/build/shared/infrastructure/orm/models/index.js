"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env = process.env.NODE_ENV || "development";
const config_js_1 = __importDefault(require("../config/config.js"));
let sequelize;
sequelize = new sequelize_typescript_1.Sequelize(config_js_1.default[env]);
sequelize.addModels([__dirname + '/**/*.model.ts']);
sequelize.authenticate().then(() => console.log('db runnig')).catch(e => console.log("error db ", e));
console.log(sequelize.models, '--models');
exports.default = sequelize;
