import { Inject, Service } from "typedi";
import { UserEntity } from "../../domain/UserEntity";
import { UserRepository } from "../../domain/UserRepository";
import User from "@/shared/infrastructure/orm/models/user.model";

@Service()
export  class SequelizeUserRepository implements UserRepository{
    constructor(
        @Inject('User') private userModel: typeof User
    ) {}

    async save(user: UserEntity): Promise<void> {
        await this.userModel.create({
            email: user.email,
            name: user.name,
            password: user.getPassword(),
            role: user.role
        })
        return  
    };

    async findOneByEmail(email: string): Promise<UserEntity> {
        const user = await this.userModel.findOne({where: {
            email
        }})
        
        return user ? new UserEntity(user.id, user.name, user.email, user.role, user.password, user.createdAt) : null
    }

    async findOneById(id: string): Promise<void> {
        
    }
}