export {};
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

enum Role {
    Admin,
    DefaultUser,
}

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

module.exports = { User };
