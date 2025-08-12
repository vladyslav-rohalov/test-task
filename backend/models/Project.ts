import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./User";

type ProjectAttrs = {
    id: string;
    owner: string;
    name: string;
    url: string;
    stars: number;
    forks: number;
    issues: number;
    creation_date: number;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
};
type ProjectCreation = Optional<ProjectAttrs, "id">;

export class Project extends Model<ProjectAttrs, ProjectCreation> implements ProjectAttrs {
    declare id: string;
    declare owner: string;
    declare name: string;
    declare url: string;
    declare stars: number;
    declare forks: number;
    declare issues: number;
    declare creation_date: number;
    declare user_id: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Project.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        owner: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        forks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        issues: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        creation_date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
    },
    {
        sequelize,
        tableName: "projects",
        modelName: "Project",
    }
);

Project.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Project, { foreignKey: "user_id", as: "projects" });
