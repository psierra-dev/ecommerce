import { Service } from "typedi";
import boom from "@hapi/boom"

import { JwtService } from "@/shared/services/JwtService";
import { comparePassword, passwordHash } from "@/shared/utils/bcrypt";

import { UserEntity } from "./UserEntity";
import { SequelizeUserRepository } from "../infrastructure/repositories/SequelizeUserRepository";

@Service()
export default class UserService {
    constructor(
        private userRepository: SequelizeUserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(name: string, email: string, role: "client" | "admin", password: string) {
        const exitingUser = await this.userRepository.findOneByEmail(email)
        
       if(exitingUser) {
            throw boom.badRequest("User already register")
        }

        const pass = await passwordHash(password)
        const user = new UserEntity("", name, email, role, pass, new Date())
        
        await this.userRepository.save(user)
    }

    async signIn(email: string, password: string) {
        const exitingUser = await this.userRepository.findOneByEmail(email)
        
       if(!exitingUser) {
            throw boom.badRequest("email or password incorrect")
        }
        
        const isValidPassword = await comparePassword(password, exitingUser.getPassword())

        if(!isValidPassword) {
            throw boom.badRequest("email or password incorrect")
        }
        const token = this.jwtService.signToken({email: exitingUser.email, role: exitingUser.role})

        return {token, name: exitingUser.name, email: exitingUser.email} 
    }

    async currentUser(email: string) {
        const user = await this.userRepository.findOneByEmail(email)

        if(!user) {
            throw boom.notFound('user not found')
        }

        return {id: user.id, name: user.name, email: user.email, role: user.role}
    }
}