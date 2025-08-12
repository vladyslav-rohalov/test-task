import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { User } from "../../models/User";
import { ForbiddenError } from "../../utils/errors"

export async function registerUser(email: string, password: string) {
    const exists = await User.findOne({ where: { email } });
    if (exists) return { error: "Email already in use" as const };

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    const token = jwt.sign({}, env.JWT_SECRET, {
        subject: user.id,
        expiresIn: "24h",
    });
    return { token };
}

export async function loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return { error: "Invalid credentials" as const };

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new ForbiddenError();

    const token = jwt.sign({}, env.JWT_SECRET, {
        subject: user.id,
        expiresIn: "24h",
    });
    return { token };
}
