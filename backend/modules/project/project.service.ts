import axios from "axios";
import { Project } from "../../models/Project";
import {
  BadRequestError,
  NotFoundError,
  TooManyRequestsError,
  InternalError,
} from "../../utils/errors";

type GitHubRepo = {
  name: string;
  owner: { login: string };
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
};

const ownerRepoRe = /^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/;

function parsePath(path: string) {
  const m = String(path).trim().match(ownerRepoRe);
  if (!m) throw new BadRequestError('use "owner/repo"');
  return { owner: m[1].toLowerCase(), repo: m[2].toLowerCase() };
}

async function fetchRepo(owner: string, repo: string): Promise<GitHubRepo> {
  const headers: Record<string, string> = {
    "User-Agent": "crm-test-task",
    Accept: "application/vnd.github+json",
  };
  try {
    const { data } = await axios.get<GitHubRepo>(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      timeout: 10000,
    });
    return data;
  } catch (err) {
    const e = err as any;
    const s = e.response?.status;
    if (s === 404) throw new NotFoundError("Repository not found");
    if (s === 403) throw new TooManyRequestsError("GitHub rate limit or forbidden");
    if (s && s >= 400 && s < 500) throw new BadRequestError("GitHub API error");
    throw new InternalError("GitHub request failed");
  }
}

function formatRes(userId: string, gh: GitHubRepo) {
  return {
    owner: gh.owner.login.toLowerCase(),
    name: gh.name.toLowerCase(),
    url: gh.html_url,
    stars: gh.stargazers_count ?? 0,
    forks: gh.forks_count ?? 0,
    issues: gh.open_issues_count ?? 0,
    creation_date: Math.floor(Date.parse(gh.created_at) / 1000),
    user_id: userId,
  };
}

export async function addByPath(userId: string, path: string) {
  const { owner, repo } = parsePath(path);

  const gh = await fetchRepo(owner, repo);;
  if (!gh) throw new NotFoundError("Repository not found");

  const payload = formatRes(userId, gh);

  const existing = await Project.findOne({
    where: { url: path },
  });
  if (existing) {
    await existing.update(payload);
    return existing;
  }

  const created = await Project.create(payload);
  return created;
}

export async function refreshOne(userId: string, id: string) {
  const project = await Project.findOne({ where: { id } });
  if (!project) throw new NotFoundError("Project not found");

  const gh = await fetchRepo(project.owner, project.name);
  if (!gh) throw new NotFoundError("Repository not found");
  const payload = formatRes(userId, gh);

  await project.update(payload);
  return project;
}

export async function listAll(page = 1, limit = 100, sort_as = "desc", sort_by = "updatedAt") {
  const offset = (page - 1) * limit;

  const { rows, count } = await Project.findAndCountAll({
    order: [[sort_by, sort_as]],
    limit,
    offset,
  });
  return {
    page,
    limit,
    total: count,
    items: rows,
  }
}

export async function getOne(userId: string, id: string) {
  const row = await Project.findOne({ where: { id, user_id: userId } });
  if (!row) throw new NotFoundError("Project not found");
  return row.toJSON();
}

export async function removeOne(id: string) {
  const n = await Project.destroy({ where: { id } });
  if (n === 0) throw new NotFoundError("Project not found");
}
