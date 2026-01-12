import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use("*", logger());

app.use(
  "/api/*",
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"], // Web app
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

const routes = app
  .basePath("/api")
  .get("/health", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  })
  .route("/auth", authRoute);

// Error Handling
app.onError((err, c) => {
  console.error(`Global Error: ${err.message}`);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});
app.notFound((c) => {
  return c.json(
    { error: "Not Found", message: `Route ${c.req.path} does not exist` },
    404
  );
});

export default app;
export type AppType = typeof routes;
