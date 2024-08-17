export class CategoryEntity {
    public id?: number;
    public name: string;
    public description: string;
    public readonly createdAt: Date;

    constructor(id: number , name: string, description: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
}