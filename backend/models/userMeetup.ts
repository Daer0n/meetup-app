export {};
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User_meetup = sequelize.define("user_meetup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = {
    User_meetup,
};
