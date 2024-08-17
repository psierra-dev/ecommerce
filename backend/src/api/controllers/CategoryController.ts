import {Request, Response} from "express"
import Container, { Service } from "typedi";
import httpStatus from "http-status";
import { CreateCategoryUseCase } from "@/modules/category/application/use-case/CreateCategoryUseCase";
import { BulkCreateCategoryUseCase } from "@/modules/category/application/use-case/BulkCreateCategoryUseCase";
import { GetAllCategoryUseCase } from "@/modules/category/application/use-case/GetAllCategoryUseCase";
import { GetOneCategoryUseCase } from "@/modules/category/application/use-case/GetOneCategoryUseCase";
import { DeleteCategoryUseCase } from "@/modules/category/application/use-case/DeleteCategoryUseCase";


@Service()
export default class CategoryController {
    constructor(
        //private signUpUserUseCase: SignUpUserUseCase
    ) {}

    async create(req: Request, res: Response) {
        const {name, description} = req.body
        const createCategoryUseCase = Container.get(CreateCategoryUseCase)
        await createCategoryUseCase.execute(name, description)
        res.status(httpStatus.CREATED).send("category created")
    }

    async bulkCreate(req: Request, res: Response) {
        const categories = req.body

        const bulkCreateCategoryUseCase = Container.get(BulkCreateCategoryUseCase)
        await bulkCreateCategoryUseCase.execute(categories)
        res.status(httpStatus.CREATED).send("categories created")
    }
    async getAll(req: Request, res: Response) {
        const getAllCategoryUseCase = Container.get(GetAllCategoryUseCase)
        const categories = await getAllCategoryUseCase.execute()
        res.status(httpStatus.OK).json(categories)
    }
    async getOneById(req: Request, res: Response) {
        const { id } = req.params

        const getOneCategoryUseCase = Container.get(GetOneCategoryUseCase)
        const category = await getOneCategoryUseCase.execute(Number.parseInt(id))
        res.status(httpStatus.OK).json(category)
    }
    async deleteOneById(req: Request, res: Response) {
        const { id } = req.params

        const deleteCategoryUseCase = Container.get(DeleteCategoryUseCase)
        await deleteCategoryUseCase.execute(Number.parseInt(id))
        res.status(httpStatus.OK).send(`category with id ${id} deleted`)
    }

    //update
}
