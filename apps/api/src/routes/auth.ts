import { Hono } from "hono";
import { auth } from "../lib/auth";

const authRoute = new Hono();

// Better Auth handles GET and POST requests
authRoute.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export { authRoute };
