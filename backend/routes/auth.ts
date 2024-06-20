export {};
const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("logout", authController.logout);
router.get("/auth", authController.auth);

module.exports = router;
