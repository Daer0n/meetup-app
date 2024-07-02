import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class MeetupUser extends Model {
    declare id: number;
}

MeetupUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        modelName: "meetup_user",
        timestamps: false,
    }
);

export default MeetupUser;
