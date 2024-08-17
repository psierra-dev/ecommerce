import { Service } from "typedi";
import { CategoryService } from "../../domain/CategoryService";

@Service()
export class GetAllCategoryUseCase {
    constructor(
        private categoryService: CategoryService
    ) {}

    public async execute() {
        return await this.categoryService.getAll()
    }
}
