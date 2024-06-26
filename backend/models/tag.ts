import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Tag extends Model {
    declare id: number;
    declare name: string;
}

Tag.init(
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
    },
    {
        sequelize,
        modelName: "tag",
        timestamps: false,
    }
);

export default Tag;
