import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async";
import { registerUser, loginUser } from "./auth.service";

type AuthedRequest = Request & { user: { id: string; email: string } };

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    if (result.error) return res.status(409).json(result.error);
    return res.status(201).json(result);
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if ("error" in result) return res.status(401).json(result);
    return res.json(result);
}

const getMe = asyncHandler(async (req: AuthedRequest, res: Response) => {
    return res.json({ id: req.user.id, email: req.user.email });
});

export default { register, login, getMe };