export {};
const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Role = {
    Admin: "Admin",
    DefaultUser: "DefaultUser",
};

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: {
        type: DataTypes.ENUM(Object.keys(Role)),
        defaultValue: Role.DefaultUser,
    },
});

const Meetup = sequelize.define("meetup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    tags: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    place: { type: DataTypes.STRING },
});

const User_meetup = sequelize.define("user_meetup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.belongsToMany(Meetup, { through: User_meetup });
Meetup.belongsToMany(User, { through: User_meetup });

module.exports = {
    User,
    Meetup,
    User_meetup,
};
