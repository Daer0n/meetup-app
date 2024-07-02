import Joi from "joi";

interface ILoginUserDto {
    username: string;
    password: string;
}

class LoginUserDto implements ILoginUserDto {
    public username: string;
    public password: string;

    constructor(data: ILoginUserDto) {
        this.username = data.username;
        this.password = data.password;
    }
}

const LoginUserSchema = Joi.object<ILoginUserDto>({
    username: Joi.string().required(),
    password: Joi.string().min(5).alphanum().required(),
});

export { LoginUserDto, ILoginUserDto, LoginUserSchema };
