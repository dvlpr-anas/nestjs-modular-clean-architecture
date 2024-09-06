import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './env.validation';
import { User } from './modules/user/domain/entities/user.entity';
import { UserController } from './modules/user/interfaces/controllers/user.controller';
import { TypeOrmUserRepository } from './modules/user/infrastructure/repositories/typeorm-user.repository';
import { CreateUserUseCase } from './modules/user/application/use-cases/create-user.use-case';
import { FindUserUseCase } from './modules/user/application/use-cases/find-user.use-case';
import { UpdateUserUseCase } from './modules/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './modules/user/application/use-cases/delete-user.use-case';
import { UserService } from './modules/user/infrastructure/services/user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<string>('DB_TYPE'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                synchronize: configService.get<boolean>('DB_synchronize'),
                entities: [User],
                autoLoadEntities: true
            } as any),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        TypeOrmUserRepository,
        CreateUserUseCase,
        FindUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
    ],
})
export class AppModule { }
