"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(id, name, description, price, stock, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.createdAt = createdAt;
    }
    decreaseStock(quantity) {
        if (this.stock - quantity < 0) {
            throw new Error("Not enough stock available");
        }
        this.stock -= quantity;
        this.updatedAt = new Date();
    }
    increaseStock(quantity) {
        this.stock += quantity;
        this.updatedAt = new Date();
    }
}
exports.ProductEntity = ProductEntity;
