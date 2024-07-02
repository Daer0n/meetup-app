import express from "express";
import { Router } from "express";
import authRouter from "./auth.router";

const router = Router();

router.use("/auth", authRouter);

export default router;
