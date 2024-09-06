import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: TypeOrmUserRepository) { }

    async execute(id: string, name: string, email: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }

        // Update user properties
        user.updateName(name);
        user.updateEmail(email);

        await this.userRepository.update(user);
        return user;
    }
}
