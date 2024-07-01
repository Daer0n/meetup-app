import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Role from "../enums/role";

class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare role: Role;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(Role).map(String)), // Приведение значений перечисления к типу string
            allowNull: false,
            defaultValue: Role.DefaultUser.toString(),
        },
    },
    {
        sequelize,
        modelName: "user",
        timestamps: false,
    }
);

export default User;
