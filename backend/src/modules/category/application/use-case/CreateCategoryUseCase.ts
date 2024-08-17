import { Service } from "typedi";
import { CategoryService } from "../../domain/CategoryService";

@Service()
export class CreateCategoryUseCase {
    constructor(
        private categoryService: CategoryService
    ) {}

    public async execute(name: string, description: string ) {
        await this.categoryService.create(name, description)
    }
}
