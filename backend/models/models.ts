import Meetup from "./meetup";
import User from "./user";
import Tag from "./tag";
import MeetupUser from "./meetup-user";

Meetup.belongsToMany(Tag, { through: "meetup_tags" });
Tag.belongsToMany(Meetup, { through: "meetup_tags" });

Meetup.belongsToMany(User, { through: MeetupUser });
User.belongsToMany(Meetup, { through: MeetupUser });
