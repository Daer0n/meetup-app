import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service";
import { CreateUserDto } from "../dto/user/create.user.dto";
import { LoginUserDto } from "../dto/user/login.user.dto";
import { CreateUserRequest, LoginUserRequest } from "../schemas/user.schemas";

class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: CreateUserRequest, res: Response) {
        const createUserDto: CreateUserDto = req.body;

        const user = await this.userService.register(createUserDto);

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists",
            });
        }

        res.status(StatusCodes.OK).json(user);
    }

    login(req: LoginUserRequest, res: Response) {
        const loginUserDto: LoginUserDto = req.body;

        this.userService
            .login(loginUserDto)
            .then((result) => {
                if (!result) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Incorrect username or password",
                    });
                }

                res.cookie("jwt", result.accessToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie("jwt-refresh", result.refreshToken, {
                    httpOnly: true,
                    secure: true,
                });

                res.status(StatusCodes.OK).json(result);
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                });
            });
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies["jwt-refresh"];

        try {
            await this.userService.refreshToken(refreshToken, (result) => {
                if (!result) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "No refresh token specified",
                    });
                }

                res.cookie("jwt", result.accessToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie("jwt-refresh", result.refreshToken, {
                    httpOnly: true,
                    secure: true,
                });

                res.status(StatusCodes.OK).json(result);
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    logout(req: Request, res: Response) {
        res.clearCookie("jwt");
        res.clearCookie("jwt-refresh");

        res.status(StatusCodes.OK).json({
            message: "You have logged out",
        });
    }
}

export default AuthController;
