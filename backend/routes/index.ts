export {};
const authRouter = require("./auth");
const meetupRouter = require("./meetupRouter");
const userRouter = require("./userRouter");
const Router = require("express");

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/meetup", meetupRouter);

module.exports = router;
