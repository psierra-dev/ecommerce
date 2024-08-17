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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserRepository = void 0;
const typedi_1 = require("typedi");
const UserEntity_1 = require("../../domain/UserEntity");
let SequelizeUserRepository = class SequelizeUserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.create({
                email: user.email,
                name: user.name,
                password: user.getPassword(),
                role: user.role
            });
            return;
        });
    }
    ;
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ where: {
                    email
                } });
            return user ? new UserEntity_1.UserEntity(user.id, user.name, user.email, user.role, user.password, user.createdAt) : null;
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
exports.SequelizeUserRepository = SequelizeUserRepository;
exports.SequelizeUserRepository = SequelizeUserRepository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('User')),
    __metadata("design:paramtypes", [Object])
], SequelizeUserRepository);
