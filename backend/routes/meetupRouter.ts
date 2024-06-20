export {};
const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetupController");

router.post("/", meetupController.createMeetup);
router.get("/", meetupController.getAllMeetups);
router.get("/id", meetupController.getMeetup);
router.patch("/id", meetupController.updateMeetup);
router.delete("/id", meetupController.deleteMeetup);

module.exports = router;
