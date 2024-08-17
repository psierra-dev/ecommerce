import { Service } from "typedi";
import UserService from "../../domain/UserServices";
import NodeMailerService from "@/shared/services/NodemailerService";
import { JwtService } from "@/shared/services/JwtService";


@Service()
export default class SignUpUserUseCase {
    constructor(
        private userService: UserService,
        private mailService: NodeMailerService,
        private jwtService: JwtService
    ) {}

    public async execute(name: string, email: string, role: 'client' | 'admin', password: string) {
            await this.userService.signUp(name, email, role, password)

            const token = this.jwtService.signToken(email)

            await this.mailService.sendVerificationEmail(email, name, token)
    }
}