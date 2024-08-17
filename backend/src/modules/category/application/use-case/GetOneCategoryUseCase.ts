import { Service } from "typedi";
import { CategoryService } from "../../domain/CategoryService";

@Service()
export class GetOneCategoryUseCase {
    constructor(
        private categoryService: CategoryService
    ) {}

    public async execute(id: number) {
        return await this.categoryService.getOneById(id)
    }
}
