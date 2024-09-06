import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseUUIDPipe,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserService } from '../../infrastructure/services/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    /**
     * Create a new user
     * Route: POST /users
     */
    @Post()
    @HttpCode(HttpStatus.CREATED) // Returns 201 status code
    create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDTO);
    }

    /**
     * Get a user by ID
     * Route: GET /users/:id
     */
    @Get(':id')
    find(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<User> {
        return this.userService.find(id);
    }

    /**
     * Update a user by ID
     * Route: PUT /users/:id
     */
    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() updateUserDTO: UpdateUserDTO,
    ): Promise<User> {
        return this.userService.update(id, updateUserDTO);
    }

    /**
     * Delete a user by ID
     * Route: DELETE /users/:id
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Returns 204 status code
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
