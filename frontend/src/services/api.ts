import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000";

export type AuthResponse = { token: string };

export type Project = {
    id: string;
    owner: string;
    name: string;
    url: string;
    stars: number;
    forks: number;
    issues: number;
    creation_date: number;
    user_id: string | null;
    createdAt: string;
    updatedAt: string;
};

export type ProjectsListResponse = {
    page: number;
    limit: number;
    total: number;
    items: Project[];
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Projects", "Project"],
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (body) => ({ url: "/auth/register", method: "POST", body }),
        }),
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (body) => ({ url: "/auth/login", method: "POST", body }),
        }),
        getProjects: builder.query<ProjectsListResponse, { page: number; limit: number; sort_by?: string; sort_as?: "asc" | "desc" }>({
            query: ({ page, limit, sort_by = "id", sort_as = "desc" }) =>
                `/projects?page=${page}&limit=${limit}&sort_by=${encodeURIComponent(sort_by)}&sort_as=${sort_as}`,
            providesTags: (res) =>
                res
                    ? [
                        ...res.items.map((p) => ({ type: "Project" as const, id: p.id })),
                        { type: "Projects" as const, id: "LIST" },
                    ]
                    : [{ type: "Projects", id: "LIST" }],
        }),
        addProject: builder.mutation<Project, { path: string }>({
            query: (body) => ({ url: "/projects", method: "POST", body }),
            invalidatesTags: [{ type: "Projects", id: "LIST" }],
        }),
        refreshProject: builder.mutation<Project, { id: string }>({
            query: ({ id }) => ({ url: `/projects/${id}/refresh`, method: "POST" }),
            invalidatesTags: (r) => (r ? [{ type: "Project", id: r.id }, { type: "Projects", id: "LIST" }] : [{ type: "Projects", id: "LIST" }]),
        }),
        deleteProject: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({ url: `/projects/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Projects", id: "LIST" }],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProjectsQuery,
    useAddProjectMutation,
    useRefreshProjectMutation,
    useDeleteProjectMutation,
} = api;
