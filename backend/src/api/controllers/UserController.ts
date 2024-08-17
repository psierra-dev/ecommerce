import {Request, Response} from "express"
import Container, { Service } from "typedi";
import httpStatus from "http-status";

import SignUpUserUseCase from "@/modules/auth/application/use-case/SignUpUseCase";
import SignInUserUseCase from "@/modules/auth/application/use-case/SignInUseCase";
import CurrentUserUseCase from "@/modules/auth/application/use-case/CurrentUserUseCase";

@Service()
export default class UserController {
    constructor(
        //private signUpUserUseCase: SignUpUserUseCase
    ) {}

    async signUp(req: Request, res: Response) {
        const {name, email, role, password} = req.body
        const signUpUserUseCase = Container.get(SignUpUserUseCase)
        await signUpUserUseCase.execute(name, email, role, password)
        res.status(httpStatus.CREATED).send("user created")
    }

    async signIn(req: Request, res: Response) {
        const {email, password} = req.body
        const signUpUserUseCase = Container.get(SignInUserUseCase)
        const userSigned = await signUpUserUseCase.execute(email, password)
        res.status(200).json(userSigned)
    }

    async currentUser(req: Request, res: Response) {
        const {email} = (req as any).user
        const currentUserUseCase = Container.get(CurrentUserUseCase)
        const user = await currentUserUseCase.execute(email)
        res.status(200).json(user)
    }
}