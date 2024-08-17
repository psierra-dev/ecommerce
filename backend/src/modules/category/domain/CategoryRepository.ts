import { CategoryEntity } from "./CategoryEntity";


export interface CategoryRepository {
    save(category: CategoryEntity): Promise<void>;
    bulkSave(categories: CategoryEntity[]): Promise<void>;
    update(id: number, data: any): Promise<CategoryEntity>;
    delete(id: number): Promise<void>;
    findOneByName(name: string): Promise<CategoryEntity>;
    findOneById(id: number): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>
}