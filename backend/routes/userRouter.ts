export {};
const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.delete("/id", userController.deleteUser);

module.exports = router;
