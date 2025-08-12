import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async";
import { listAll, addByPath, refreshOne, getOne, removeOne } from "./project.service";

type AuthedRequest = Request & { user: { id: string; email: string } };

const list = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const { page, limit, sort_as, sort_by } = req.query as any;
  const items = await listAll(Number(page) || 1, Number(limit) || 10, sort_as, sort_by);
  res.json(items);
});

const add = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const out = await addByPath(req.user.id, req.body.path);
  res.status(201).json(out);
});

const refresh = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const out = await refreshOne(req.user.id, req.params.id);
  res.json(out);
});

const get = asyncHandler(async (req: AuthedRequest, res: Response) => {
  const out = await getOne(req.user.id, req.params.id);
  res.json(out);
});

const remove = asyncHandler(async (req: AuthedRequest, res: Response) => {
  await removeOne(req.params.id);
  res.status(204).send();
});

export default { list, add, refresh, get, remove };
