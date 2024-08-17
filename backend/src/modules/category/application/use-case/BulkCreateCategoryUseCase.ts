import { Service } from "typedi";
import { CategoryService } from "../../domain/CategoryService";

@Service()
export class BulkCreateCategoryUseCase {
    constructor(
        private categoryService: CategoryService
    ) {}

    public async execute(categories: {name: string, description: string}[]) {
        await this.categoryService.bulkCreate(categories)
    }
}
