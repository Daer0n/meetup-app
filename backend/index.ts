// import "dotenv/config"
// const sequelize = require("./config/db");
// const User = require("./models/user");
// const Tag = require("./models/tag");
// const Meetup = require("./models/meetup");
// const UserMeetup = require("./models/userMeetup");
// const cors = require("cors");
// const router = require("./routes/index");

// import express from "express"
// import sequi

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/api", router);

// const start = async () => {
//     try {
//         await sequelize.authenticate();
//         await sequelize.sync();
//     } catch (e) {
//         console.log(e);
//     }
// };

// start();

import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/db";
import router from "./routers/index";

const User = require("./models/user");
const Tag = require("./models/tag");
const Meetup = require("./models/meetup");
const MeetupUser = require("./models/meetupUser");

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
