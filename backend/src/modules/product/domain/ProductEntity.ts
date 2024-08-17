export class ProductEntity {
    public id?: number;
    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public readonly createdAt: Date;
    public updatedAt: Date;

    constructor(id: number , name: string, description: string, price: number, stock: number, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.createdAt = createdAt;
    }

    decreaseStock(quantity: number) {
        if (this.stock - quantity < 0) {
            throw new Error("Not enough stock available");
        }
        this.stock -= quantity;
        this.updatedAt = new Date();
    }

    increaseStock(quantity: number) {
        this.stock += quantity;
        this.updatedAt = new Date();
    }
}