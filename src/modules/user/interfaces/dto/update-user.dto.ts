import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;

    @IsEmail({}, { message: 'Invalid email format.' })
    email: string;
}