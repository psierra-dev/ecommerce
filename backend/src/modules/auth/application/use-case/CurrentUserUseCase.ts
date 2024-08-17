import { Service } from "typedi";
import UserService from "../../domain/UserServices";



@Service()
export default class CurrentUserUseCase {
    constructor(
        private userService: UserService,
    ) {}

    public async execute(email: string) {
        const user = await this.userService.currentUser(email)

        return user
    }
}