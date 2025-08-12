import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import { User } from "../models/User";
import { UnauthorizedError } from "../utils/errors"

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const header = (req.headers.authorization ?? req.headers.Authorization) as string | undefined;
    if (!header) throw new UnauthorizedError();

    const [scheme, token] = header.split(" ");
    if (!/^Bearer$/i.test(scheme) || !token) {
      throw new UnauthorizedError();
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload & { sub?: string; email?: string };
    const userId = payload.sub;
    if (!userId) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = { id: user.id, email: user.email };

    return next();
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
