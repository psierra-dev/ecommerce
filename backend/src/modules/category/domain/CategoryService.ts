import { Service } from "typedi";
import { SequelizeCategoryRepository } from "../infrastructure/orm/SequelizeCategoryRepository";

import boom from "@hapi/boom"
import { CategoryEntity } from "./CategoryEntity";

@Service()
export class CategoryService {
    constructor(
        private categoryRepository: SequelizeCategoryRepository
    ) {}

    async create(name: string, description: string) {
        const existingCategory = this.categoryRepository.findOneByName(name)
        if(existingCategory) {
            throw boom.badData("category name already exists")
        }
        await this.categoryRepository.save(new CategoryEntity(0, name, description, new Date()))
    }

    async bulkCreate(categories: {name: string, description: string}[]) {
        await this.categoryRepository.bulkSave(categories.map(category => new CategoryEntity(0, category.name, category.description, new Date())))
    }

    async getAll() {
        const categories = await this.categoryRepository.findAll()
        return categories
    }

    async getOneById(id: number) {
        const category = await this.categoryRepository.findOneById(id)

        if(!category) {
            throw boom.badData("the category does not exist")
        }

        return category
    }

    async delete(id: number) {
        const existingCategory = this.categoryRepository.findOneById(id)
        if(!existingCategory) {
            throw boom.badData("the category does not exist")
        }
        await this.categoryRepository.delete(id)
    }
}