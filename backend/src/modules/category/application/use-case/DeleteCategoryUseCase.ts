import { Service } from "typedi";
import { CategoryService } from "../../domain/CategoryService";

@Service()
export class DeleteCategoryUseCase {
    constructor(
        private categoryService: CategoryService
    ) {}

    public async execute(id: number) {
        await this.categoryService.delete(id)
    }
}
