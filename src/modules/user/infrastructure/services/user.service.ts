import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { FindUserUseCase } from '../../application/use-cases/find-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { CreateUserDTO } from '../../interfaces/dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDTO } from '../../interfaces/dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserUseCase: FindUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const { name, email, password } = createUserDTO;
        return await this.createUserUseCase.execute(name, email, password);
    }

    async find(id: string): Promise<User> {
        return await this.findUserUseCase.execute(id);
    }

    async update(
        id: string,
        updateUserDTO: UpdateUserDTO,
    ): Promise<User> {
        const { name, email } = updateUserDTO;
        return await this.updateUserUseCase.execute(id, name, email);
    }

    async delete(id: string): Promise<void> {
        await this.deleteUserUseCase.execute(id);
    }
}
