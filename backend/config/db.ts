import { Sequelize } from "sequelize";
import env from "./env";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    logging: false,
    pool: { max: 10, min: 0, idle: 10000, acquire: 30000 },
});

export async function assertDbConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ DB connected");
    } catch (e) {
        console.error("❌ DB connection failed:", e);
        process.exit(1);
    }
}
