export {};
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Tag = sequelize.define("tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
});

module.exports = { Tag };
