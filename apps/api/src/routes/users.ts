import { Hono } from "hono";

import { db } from "@repo/db/client";
import { createUserSchema } from "@repo/db/validation";

//This function runs as a middleware between each request and response
import { zValidator } from "@hono/zod-validator";

export const usersRoute = new Hono();
