import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

type SimpleError = {
    msg: unknown;
    param?: string;
    location?: string;
    type: ValidationError["type"];
    children?: ValidationError[];
};

function normalizeError(e: ValidationError): SimpleError {
    if (e.type === "field") {
        return { msg: e.msg, param: e.path, location: e.location, type: e.type };
    }
    return { msg: e.msg, type: e.type, children: (e as any).nestedErrors };
}

export function errorValidator(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();

    const details = result.array({ onlyFirstError: true }).map(normalizeError);
    return res.status(400).json({ error: "Validation error", details });
}

