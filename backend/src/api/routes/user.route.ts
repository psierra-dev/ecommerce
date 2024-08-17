
import { Router } from "express"
import { Container } from "typedi"
import UserController from "../controllers/UserController"
import { routePrivate } from "../middleware/routePrivate";

export const register = (router: Router): void => {
    const userController = Container.get(UserController)
    
    router.post("/auth/signup",  userController.signUp)
    router.post("/auth/signin",userController.signIn)
    router.get("/auth/profile", routePrivate() , userController.currentUser)
};