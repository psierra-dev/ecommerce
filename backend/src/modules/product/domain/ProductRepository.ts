import { ProductEntity } from "./ProductEntity";



export interface ProductRepository {
    save(category: ProductEntity): Promise<void>;
    bulkSave(categories: ProductEntity[]): Promise<void>;
    update(id: number, data: any): Promise<ProductEntity>;
    delete(id: number): Promise<void>;
    findOneByName(name: string): Promise<ProductEntity>;
    findOneById(id: number): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>
}