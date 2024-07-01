import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import Tag from "./tag";

class Meetup extends Model {
    declare id: number;
    declare name: string;
    declare descriprion: string;
    declare date: Date;
    declare place: string;
}

Meetup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        descriprion: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "meetup",
        timestamps: false,
    }
);

export default Meetup;
