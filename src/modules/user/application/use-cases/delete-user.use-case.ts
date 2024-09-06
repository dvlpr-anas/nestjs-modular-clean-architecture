import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: TypeOrmUserRepository) { }

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        await this.userRepository.delete(id);
    }
}
