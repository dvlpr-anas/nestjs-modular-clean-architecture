// src/modules/user/infrastructure/repositories/typeorm-user.repository.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async update(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
