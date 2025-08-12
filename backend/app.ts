import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import projectRouter from "./modules/project/project.routes";
const app = express();

app.set("x-powered-by", false);
app.use(cors());

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use((req, _res, next) => {
    const t = new Date().toISOString();
    console.info(`ℹ️ [${t}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

app.use((req, _res, next) => {
    const err = new Error(`Not found: ${req.originalUrl}`);
    (err as any).status = 404;
    next(err);
});

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = Number(err?.status || err?.statusCode) || 500;
    const expose = status < 500;

    const payload = {
        error: expose ? String(err?.message || "Bad request") : "Internal Server Error",
        code: err?.code ?? (status === 404 ? "NOT_FOUND" : status === 401 ? "UNAUTHORIZED" : "SERVER_ERROR"),
        details: expose ? err?.details : undefined,
    };

    res.status(status).json(payload);
});

export default app;
