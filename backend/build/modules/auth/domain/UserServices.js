"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typedi_1 = require("typedi");
const boom_1 = __importDefault(require("@hapi/boom"));
const JwtService_1 = require("@/shared/services/JwtService");
const bcrypt_1 = require("@/shared/utils/bcrypt");
const UserEntity_1 = require("./UserEntity");
const SequelizeUserRepository_1 = require("../infrastructure/repositories/SequelizeUserRepository");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signUp(name, email, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitingUser = yield this.userRepository.findOneByEmail(email);
            if (exitingUser) {
                throw boom_1.default.badRequest("User already register");
            }
            const pass = yield (0, bcrypt_1.passwordHash)(password);
            const user = new UserEntity_1.UserEntity("", name, email, role, pass, new Date());
            yield this.userRepository.save(user);
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitingUser = yield this.userRepository.findOneByEmail(email);
            if (!exitingUser) {
                throw boom_1.default.badRequest("email or password incorrect");
            }
            const isValidPassword = yield (0, bcrypt_1.comparePassword)(password, exitingUser.getPassword());
            if (!isValidPassword) {
                throw boom_1.default.badRequest("email or password incorrect");
            }
            const token = this.jwtService.signToken({ email: exitingUser.email, role: exitingUser.role });
            return { token, name: exitingUser.name, email: exitingUser.email };
        });
    }
    currentUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneByEmail(email);
            if (!user) {
                throw boom_1.default.notFound('user not found');
            }
            return { id: user.id, name: user.name, email: user.email, role: user.role };
        });
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [SequelizeUserRepository_1.SequelizeUserRepository,
        JwtService_1.JwtService])
], UserService);
exports.default = UserService;
