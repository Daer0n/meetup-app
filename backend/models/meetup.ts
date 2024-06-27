export {};
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Meetup = sequelize.define("meetup", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    tags: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    place: { type: DataTypes.STRING },
});


module.exports = { Meetup };
