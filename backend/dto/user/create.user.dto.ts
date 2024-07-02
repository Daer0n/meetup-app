import Joi from "joi";
import Role from "../../enums/role";

interface ICreateUserDto {
    username: string;
    email: string;
    role: Role;
    password: string;
}

class CreateUserDto implements ICreateUserDto {
    public username: string;
    public email: string;
    public role: Role;
    public password: string;

    constructor(data: ICreateUserDto) {
        this.username = data.username;
        this.email = data.email;
        this.role = data.role;
        this.password = data.password;
    }
}

const CreateUserSchema = Joi.object<ICreateUserDto>({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).alphanum().required(),
});

export { CreateUserDto, ICreateUserDto, CreateUserSchema };
