export {};
const User = require("./user");
const User_meetup = require("./userMeetup");
const Meetup = require("./meetup");
const Tag = require("./tag");

User.belongsToMany(Meetup, { through: User_meetup });
Meetup.belongsToMany(User, { through: User_meetup });

Tag.belongsTo(User);
User.hasMany(Tag);
