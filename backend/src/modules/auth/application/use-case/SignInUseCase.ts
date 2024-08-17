import { Service } from "typedi";
import UserService from "../../domain/UserServices";
import NodeMailerService from "@/shared/services/NodemailerService";
import { JwtService } from "@/shared/services/JwtService";


@Service()
export default class SignInUserUseCase {
    constructor(
        private userService: UserService,
        private mailService: NodeMailerService,
        private jwtService: JwtService
    ) {}

    public async execute(email: string, password: string) {
        const user = await this.userService.signIn(email, password)

        return user
    }
}