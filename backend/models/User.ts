import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

type UserAttrs = {
    id: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
};
type UserCreation = Optional<UserAttrs, "id">;

export class User extends Model<UserAttrs, UserCreation> implements UserAttrs {
    declare id: string;
    declare email: string;
    declare password: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "users",
        modelName: "User",
    }
);
