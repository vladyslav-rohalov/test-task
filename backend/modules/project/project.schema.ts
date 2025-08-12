import { body, param, query } from "express-validator";
import { errorValidator } from "../../middlewares/validate";

const slug = /^[A-Za-z0-9_.-]+$/;
const ownerRepo = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

const projectIdParam = [
    param("id").isUUID("4").withMessage("id must be uuid v4"),
    errorValidator
];

const listProjectsQuery = [
    query("limit").optional().toInt().isInt({ min: 1, max: 100 }).withMessage("limit 1..100"),
    query("offset").optional().toInt().isInt({ min: 0 }).withMessage("offset >= 0"),
    errorValidator
];

export const createProject = [
  body("path")
    .isString().withMessage("path must be a string")
    .trim()
    .matches(ownerRepo).withMessage('use "owner/repo"')
    .bail()
    .custom((v) => {
      const [owner, repo] = v.split("/");
      if (!slug.test(owner) || !slug.test(repo)) throw new Error("invalid owner or repo name");
      return true;
    }),
  errorValidator,
];

export default { projectIdParam, listProjectsQuery, createProject };