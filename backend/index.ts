require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const User = require("./models/user");
const Tag = require("./models/tag");
const Meetup = require("./models/meetup");
const UserMeetup = require("./models/userMeetup");
const cors = require("cors");
const router = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log(e);
    }
};

start();
