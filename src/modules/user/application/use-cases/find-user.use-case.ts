import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';

@Injectable()
export class FindUserUseCase {
    constructor(private readonly userRepository: TypeOrmUserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }
}
