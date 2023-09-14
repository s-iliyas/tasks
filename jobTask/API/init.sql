--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Debian 12.16-1.pgdg120+1)
-- Dumped by pg_dump version 12.16 (Debian 12.16-1.pgdg120+1)

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
-- Name: users; Type: TABLE; Schema: public; Owner: task
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    name character varying,
    hashed_password character varying
);


ALTER TABLE public.users OWNER TO task;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: task
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO task;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: task
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: v1Items; Type: TABLE; Schema: public; Owner: task
--

CREATE TABLE public."v1Items" (
    id integer NOT NULL,
    title character varying,
    description character varying
);


ALTER TABLE public."v1Items" OWNER TO task;

--
-- Name: v1Items_id_seq; Type: SEQUENCE; Schema: public; Owner: task
--

CREATE SEQUENCE public."v1Items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."v1Items_id_seq" OWNER TO task;

--
-- Name: v1Items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: task
--

ALTER SEQUENCE public."v1Items_id_seq" OWNED BY public."v1Items".id;


--
-- Name: v2Items; Type: TABLE; Schema: public; Owner: task
--

CREATE TABLE public."v2Items" (
    id integer NOT NULL,
    title character varying,
    price double precision
);


ALTER TABLE public."v2Items" OWNER TO task;

--
-- Name: v2Items_id_seq; Type: SEQUENCE; Schema: public; Owner: task
--

CREATE SEQUENCE public."v2Items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."v2Items_id_seq" OWNER TO task;

--
-- Name: v2Items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: task
--

ALTER SEQUENCE public."v2Items_id_seq" OWNED BY public."v2Items".id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: task
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: v1Items id; Type: DEFAULT; Schema: public; Owner: task
--

ALTER TABLE ONLY public."v1Items" ALTER COLUMN id SET DEFAULT nextval('public."v1Items_id_seq"'::regclass);


--
-- Name: v2Items id; Type: DEFAULT; Schema: public; Owner: task
--

ALTER TABLE ONLY public."v2Items" ALTER COLUMN id SET DEFAULT nextval('public."v2Items_id_seq"'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: task
--

COPY public.users (id, username, name, hashed_password) FROM stdin;
\.


--
-- Data for Name: v1Items; Type: TABLE DATA; Schema: public; Owner: task
--

COPY public."v1Items" (id, title, description) FROM stdin;
\.


--
-- Data for Name: v2Items; Type: TABLE DATA; Schema: public; Owner: task
--

COPY public."v2Items" (id, title, price) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: task
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: v1Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: task
--

SELECT pg_catalog.setval('public."v1Items_id_seq"', 1, false);


--
-- Name: v2Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: task
--

SELECT pg_catalog.setval('public."v2Items_id_seq"', 1, false);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: task
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: v1Items v1Items_pkey; Type: CONSTRAINT; Schema: public; Owner: task
--

ALTER TABLE ONLY public."v1Items"
    ADD CONSTRAINT "v1Items_pkey" PRIMARY KEY (id);


--
-- Name: v2Items v2Items_pkey; Type: CONSTRAINT; Schema: public; Owner: task
--

ALTER TABLE ONLY public."v2Items"
    ADD CONSTRAINT "v2Items_pkey" PRIMARY KEY (id);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: task
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: ix_v1Items_description; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX "ix_v1Items_description" ON public."v1Items" USING btree (description);


--
-- Name: ix_v1Items_id; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX "ix_v1Items_id" ON public."v1Items" USING btree (id);


--
-- Name: ix_v1Items_title; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX "ix_v1Items_title" ON public."v1Items" USING btree (title);


--
-- Name: ix_v2Items_id; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX "ix_v2Items_id" ON public."v2Items" USING btree (id);


--
-- Name: ix_v2Items_title; Type: INDEX; Schema: public; Owner: task
--

CREATE INDEX "ix_v2Items_title" ON public."v2Items" USING btree (title);


--
-- PostgreSQL database dump complete
--

