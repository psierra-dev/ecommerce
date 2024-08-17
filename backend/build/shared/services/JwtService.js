"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const config_1 = __importDefault(require("@/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
let JwtService = class JwtService {
    signToken(payload, expires = "24h") {
        console.log(expires, 'expire');
        return jsonwebtoken_1.default.sign({ data: payload }, config_1.default.jwt_key, { expiresIn: expires });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.jwt_key);
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, typedi_1.Service)()
], JwtService);
