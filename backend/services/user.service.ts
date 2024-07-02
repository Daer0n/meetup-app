import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/user";
import { ICreateUserDto } from "../dto/user/create.user.dto";
import { ILoginUserDto } from "../dto/user/login.user.dto";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

class UserService {
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    private async findUserByName(username: string): Promise<User | null> {
        return User.findOne({ where: { username } });
    }

    private validateCreateUserDto(createUserDto: ICreateUserDto) {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            role: Joi.string().required(),
            password: Joi.string().required(),
        });

        return schema.validate(createUserDto);
    }

    async register(createUserDto: ICreateUserDto): Promise<User | null> {
        const { error } = this.validateCreateUserDto(createUserDto);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const userExist = await this.findUserByName(createUserDto.username);
        if (userExist) {
            return null;
        }

        const hashedPassword = await this.hashPassword(createUserDto.password);

        const user = await User.create({
            username: createUserDto.username,
            role: createUserDto.role,
            email: createUserDto.email,
            password: hashedPassword,
        });

        return user;
    }

    async login(loginUserDto: ILoginUserDto): Promise<ITokens | null> {
        const user = await this.findUserByName(loginUserDto.username);
        if (!user) {
            return null;
        }

        const result = await bcrypt.compare(
            loginUserDto.password,
            user.password
        );
        if (!result) {
            return null;
        }

        const tokens = await this.getTokens(user.id);

        return tokens;
    }

    private async getTokens(userId: number): Promise<ITokens | null> {
        const accessToken = jwt.sign({ id: userId }, "secret", {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign({ id: userId }, "refresh_secret", {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
    }

    async refreshToken(
        refreshToken: string,
        callback: (tokens: ITokens | null) => void
    ): Promise<void> {
        jwt.verify(refreshToken, "refresh_secret", async (err, user) => {
            if (err) {
                return callback(null);
            }

            const tokens = await this.getTokens((user as User).id);

            return callback(tokens);
        });
    }
}

export default UserService;
