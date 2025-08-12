--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Debian 16.9-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid NOT NULL,
    owner character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    url character varying(500) NOT NULL,
    stars integer DEFAULT 0 NOT NULL,
    forks integer DEFAULT 0 NOT NULL,
    issues integer DEFAULT 0 NOT NULL,
    creation_date integer NOT NULL,
    user_id uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250812103341-create-User.js
20250812103351-create-Project.js
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, owner, name, url, stars, forks, issues, creation_date, user_id, "createdAt", "updatedAt") FROM stdin;
1fa3cc4f-0b08-4074-b151-2d13135ae3b7	ivz-dev	fullstack-test-task	https://github.com/ivz-dev/FullStack-Test-Task	0	1	0	1723193278	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 14:01:21.948+00	2025-08-12 14:01:21.948+00
1be83e09-c7a5-445b-93d9-2e8ec6ad246e	facebook	react	https://github.com/facebook/react	238053	49106	1020	1369412154	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:39:13.7+00	2025-08-12 16:39:13.7+00
a4510107-f2bd-4f61-8435-b01ea88c0cc1	vercel	next.js	https://github.com/vercel/next.js	133740	29046	3294	1475710371	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:39:26.919+00	2025-08-12 16:39:26.919+00
c445e51b-9c65-4217-9662-247f397c252b	angular	angular	https://github.com/angular/angular	98460	26495	1582	1411056721	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:39:46.037+00	2025-08-12 16:39:46.037+00
97f51605-f9f3-4e84-822f-231380bc5c2d	vuejs	core	https://github.com/vuejs/core	51267	8824	1078	1528811376	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:39:51.706+00	2025-08-12 16:39:51.706+00
73d64044-3f78-41f2-9e0e-55c870f8b2c7	sveltejs	svelte	https://github.com/sveltejs/svelte	83715	4591	849	1479665585	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:39:58.324+00	2025-08-12 16:39:58.324+00
d29f80dd-8ec7-4f08-8ea1-660ef1931da6	remix-run	remix	https://github.com/remix-run/remix	31507	2674	8	1603742248	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:05.308+00	2025-08-12 16:40:05.308+00
348839af-e8ff-4a2b-9772-10565caa8bb7	nuxt	nuxt	https://github.com/nuxt/nuxt	57909	5339	845	1477480727	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:12.557+00	2025-08-12 16:40:12.557+00
951ce88e-67ee-4e73-a50e-1be50f9b1ba9	nestjs	nest	https://github.com/nestjs/nest	72179	7976	70	1486239172	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:17.577+00	2025-08-12 16:40:17.577+00
72a37874-acfb-4e3a-8322-037c1cc08b0f	expressjs	express	https://github.com/expressjs/express	67505	20173	194	1246042561	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:29.81+00	2025-08-12 16:40:29.81+00
de94881c-422f-4094-8de1-69b92955e005	fastify	fastify	https://github.com/fastify/fastify	34331	2466	121	1475089814	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:37.396+00	2025-08-12 16:40:37.396+00
39a51cc0-8ca5-4ca2-ace1-b765706387c7	nodejs	node	https://github.com/nodejs/node	112670	32587	2345	1417031831	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:44.25+00	2025-08-12 16:40:44.25+00
db0fe77a-27fa-40bd-a65e-d78f9e33e19a	denoland	deno	https://github.com/denoland/deno	103846	5685	2358	1526348066	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:52.196+00	2025-08-12 16:40:52.196+00
ce5080cb-59f1-40fc-84be-de08347bfc0f	oven-sh	bun	https://github.com/oven-sh/bun	79640	3252	5132	1618361297	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:40:58.24+00	2025-08-12 16:40:58.24+00
7f397d29-e3d4-4915-99d9-f169d93f0ad4	microsoft	typescript	https://github.com/microsoft/TypeScript	105587	12957	6052	1403018919	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:13.523+00	2025-08-12 16:41:13.523+00
211707e1-3b05-4985-8dd8-eaa7aa6ecfba	vitejs	vite	https://github.com/vitejs/vite	74687	7047	617	1587445437	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:19.443+00	2025-08-12 16:41:19.443+00
842894eb-7397-4e1c-ba78-c42f84459618	webpack	webpack	https://github.com/webpack/webpack	65469	9088	228	1331374094	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:28.845+00	2025-08-12 16:41:28.845+00
ca492a98-4f8a-45b5-9c34-f7ecb214f7c8	rollup	rollup	https://github.com/rollup/rollup	25937	1614	620	1431642388	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:33.876+00	2025-08-12 16:41:33.876+00
4d148407-91fb-4972-ab03-828c1c6823b9	parcel-bundler	parcel	https://github.com/parcel-bundler/parcel	43927	2265	584	1502123807	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:39.671+00	2025-08-12 16:41:39.671+00
751a1a69-a9d1-4f15-95e9-9135dd7de85f	swc-project	swc	https://github.com/swc-project/swc	32581	1332	442	1513942814	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:54.155+00	2025-08-12 16:41:54.155+00
3dcf10b5-9c98-4c5a-b4b7-b23370a009cb	babel	babel	https://github.com/babel/babel	43686	5739	759	1411911503	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:41:59.27+00	2025-08-12 16:41:59.27+00
14206416-38cc-4b11-a03e-81ea3ad5b311	eslint	eslint	https://github.com/eslint/eslint	26164	4779	94	1372550388	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:03.45+00	2025-08-12 16:42:03.45+00
f628d4c4-7a1b-44ac-8177-e0347df28016	prettier	prettier	https://github.com/prettier/prettier	50827	4544	1473	1480439617	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:08.506+00	2025-08-12 16:42:08.506+00
5f6f0c86-213f-4d45-9aa0-91c075ea348c	yarnpkg	berry	https://github.com/yarnpkg/berry	7818	1191	881	1536619762	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:14.157+00	2025-08-12 16:42:14.157+00
fb3200c7-4812-43bd-9ab8-f7043977a83d	pnpm	pnpm	https://github.com/pnpm/pnpm	32336	1175	1946	1453966843	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:31.834+00	2025-08-12 16:42:31.834+00
4f212272-2c78-44f8-bf77-72a6f42f6be6	npm	cli	https://github.com/npm/cli	9048	3564	600	1530833212	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:37.26+00	2025-08-12 16:42:37.26+00
2d37dd1f-70a9-45ba-9c08-9b8f108621a9	reduxjs	redux	https://github.com/reduxjs/redux	61303	15204	43	1432943595	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:42.106+00	2025-08-12 16:42:42.106+00
4ab22ab3-648c-4a94-b6f2-b477c918b693	remix-run	react-router	https://github.com/remix-run/react-router	55342	10692	141	1400278971	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:50.266+00	2025-08-12 16:42:50.266+00
f6630301-498d-401c-85ec-a49a6e301e17	mui	material-ui	https://github.com/mui/material-ui	96354	32620	1755	1408389114	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:42:55.276+00	2025-08-12 16:42:55.276+00
71c5dfae-c3fd-444a-8cc9-d72e5408d0d9	chakra-ui	chakra-ui	https://github.com/chakra-ui/chakra-ui	39513	3467	11	1566052074	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:43:01.224+00	2025-08-12 16:43:01.224+00
0f4a087e-6ac7-4494-9329-b47e038b2e7d	ant-design	ant-design	https://github.com/ant-design/ant-design	95625	53243	1279	1429889844	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:43:18.728+00	2025-08-12 16:43:18.728+00
8f4365fe-3adf-4b7e-b9fa-ea0fb6bdc568	mantinedev	mantine	https://github.com/mantinedev/mantine	29389	2117	32	1610028139	acaf63f2-023c-4367-a0d0-1535b73d4067	2025-08-12 16:43:26.312+00	2025-08-12 16:43:26.312+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "createdAt", "updatedAt") FROM stdin;
acaf63f2-023c-4367-a0d0-1535b73d4067	v.rohalov@gmail.com	$2b$10$h83vmqs6.iTzczDLvk.BveDbrPmZq..NOXfRPN4gRFfnBUrs8KglO	2025-08-12 11:28:24.447+00	2025-08-12 11:28:24.447+00
\.


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: projects_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX projects_user_id_index ON public.projects USING btree (user_id);


--
-- Name: projects projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

