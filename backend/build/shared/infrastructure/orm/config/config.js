"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../../../../config/index.js"));
const DATABASE_URL = process.env.DB_URL;
exports.default = {
    development: {
        //url: DATABASE_URL,
        dialect: "postgres",
        username: index_js_1.default.db_user,
        port: index_js_1.default.db_port,
        database: index_js_1.default.db_name,
        password: index_js_1.default.db_password,
    },
    test: {
        url: DATABASE_URL,
        dialect: "postgres",
    },
    production: {
        url: DATABASE_URL,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Importante si usas conexiones SSL sin un certificado firmado por una entidad de certificación.
            },
        },
    },
};
