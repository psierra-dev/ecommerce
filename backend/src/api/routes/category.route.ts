import { Router } from "express"
import { Container } from "typedi"

import CategoryController from "../controllers/CategoryController";
import { routePrivate } from "../middleware/routePrivate";
import checkRole from "../middleware/validateRole";

export const register = (router: Router): void => {
    const categoryController = Container.get(CategoryController)
    
    router.post("/categories", routePrivate(), checkRole('admin'), categoryController.create)
    router.post("/categories/bulk", routePrivate(), checkRole('admin'), categoryController.bulkCreate)
    router.get("/categories", categoryController.getAll)
    router.get("/categories/:id", categoryController.getOneById)
    router.delete("/categories/:id", routePrivate(), checkRole('admin'), categoryController.deleteOneById)
};