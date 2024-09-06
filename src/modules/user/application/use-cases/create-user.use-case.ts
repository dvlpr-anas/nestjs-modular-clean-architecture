import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: TypeOrmUserRepository) { }

    async execute(name: string, email: string, password: string): Promise<User> {
        const newUser = new User(name, email, password);
        newUser.id = uuidv4();
        await this.userRepository.save(newUser);
        return newUser;
    }
}
