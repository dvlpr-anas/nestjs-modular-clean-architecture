import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
}

class EnvironmentVariables {
    @IsEnum(Environment)
    @IsNotEmpty()
    NODE_ENV: Environment;

    @IsNumber()
    @IsNotEmpty()
    PORT: number;

    @IsString()
    @IsNotEmpty()
    DB_TYPE: string

    @IsString()
    @IsNotEmpty()
    DB_HOST: string

    @IsNumber()
    @IsNotEmpty()
    DB_PORT: number

    @IsString()
    @IsNotEmpty()
    DB_USERNAME: string

    @IsString()
    @IsNotEmpty()
    DB_NAME: string

    @IsBoolean()
    @IsNotEmpty()
    DB_synchronize: boolean
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}