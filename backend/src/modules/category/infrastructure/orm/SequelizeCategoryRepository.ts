import { Inject, Service } from "typedi";
import { CategoryEntity } from "../../domain/CategoryEntity";
import { CategoryRepository } from "../../domain/CategoryRepository";
import Category from "@/shared/infrastructure/orm/models/category.model";

@Service()
export class SequelizeCategoryRepository implements CategoryRepository {
    constructor(
        @Inject('Category') private categoryModel: typeof Category
    ) {}

    async save(category: CategoryEntity): Promise<void> {
        await this.categoryModel.create(category)
        return 
    }

    async bulkSave(categories: CategoryEntity[]): Promise<void> {
       await this.categoryModel.bulkCreate(categories.map(category => {
        return {
            name: category.name,
            description: category.description
        }
       }))

        return 
    }

    async delete(id: number): Promise<void> {
        const category = await this.categoryModel.findByPk(id)
        await category.destroy()
        return
    }

    async update(id: number, data: any): Promise<CategoryEntity> {
        await this.categoryModel.update(data, {
            where: {id}
        })
        return 
    }

    async findOneById(id: number): Promise<CategoryEntity> {
        const category = await this.categoryModel.findByPk(id)
        return category ? new CategoryEntity(category.id, category.name, category.description, category.createdAt ) : null
    }

    async findOneByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryModel.findOne({where: {name}})
        return category ? new CategoryEntity(category.id, category.name, category.description, category.createdAt ) : null
    }

    async findAll(): Promise<CategoryEntity[]> {
        const categories = await this.categoryModel.findAll()

        return categories ? categories.map(category => new CategoryEntity(category.id, category.name, category.description, category.createdAt)) : []
    }
}