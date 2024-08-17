import { UserEntity } from './UserEntity';

export interface UserRepository {
    save(user: UserEntity): Promise<void>;
    findOneByEmail(email: string): Promise<UserEntity>
    findOneById(id: string): Promise<void>
}