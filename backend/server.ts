import http from "http";
import app from "./app";
import env from "./config/env";
import { assertDbConnection, sequelize } from "./config/db";

const PORT = Number(env.PORT || 4000);
const server = http.createServer(app);

async function bootstrap() {
    await assertDbConnection();
    server.listen(env.PORT, () => {
        console.log(`🚀 Server started on ${PORT} port`);
    });
}

bootstrap().catch((e) => {
    console.error("❌ Server start failed:", e);
    process.exit(1);
});

function shutdown(signal: string) {
    console.log(`${signal} received. Shutting down...`);
    const FORCE_TIMEOUT = 5000;
    const t = setTimeout(() => {
        console.warn("⏳ Forcing shutdown...");
        process.exit(1);
    }, FORCE_TIMEOUT);
    t.unref();

    server.close(async (err) => {
        try { await sequelize.close(); } catch (_) { }
        clearTimeout(t);
        if (err) {
            console.error("❌ Server shutdown failed:", err);
            process.exit(1);
        }
        process.exit(0);
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
