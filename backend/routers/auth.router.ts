import express, { Router, Request, Response } from "express";
import passport from "passport";
import isValid from "../middleware/validation";
import AuthController from "../controolers/auth.controller";
import { LoginUserSchema } from "../dto/user/login.user.dto";
import { CreateUserSchema } from "../dto/user/create.user.dto";
import { CreateUserRequest, LoginUserRequest } from "../schemas/user.schemas";

const router = Router();

const authController = new AuthController();

router.post(
    "/login",
    isValid(LoginUserSchema, "body"),
    (req: LoginUserRequest, res: Response) => {
        authController.login(req, res);
    }
);

router.post(
    "/register",
    isValid(CreateUserSchema, "body"),
    (req: CreateUserRequest, res: Response) => {
        authController.register(req, res);
    }
);

router.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req: Request, res: Response) => {
        authController.logout(req, res);
    }
);

router.get(
    "/refresh",
    passport.authenticate("jwt", { session: false }),
    (req: Request, res: Response) => {
        authController.refreshToken(req, res);
    }
);

export default router;
