"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, name, email, role = "client", password, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.createdAt = createdAt;
    }
    getPassword() {
        return this.password;
    }
    // Método para cambiar la password
    setPassword(newPassword) {
        this.password = newPassword;
    }
}
exports.UserEntity = UserEntity;
