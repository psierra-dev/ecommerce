
import { Router } from "express"
import { Container } from "typedi"
import UserController from "../controllers/UserController"

export const register = (router: Router): void => {
    const userController = Container.get(UserController)
    
    router.get("/product", (req, res) => {
        res.send("user")
    })
};