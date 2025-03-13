import app from "./app";
import { connectDb, mongo } from "./db";
import { ApiConfig } from "../app.config";
// import { redis } from "./redis/connection";

(async () => {
  try {
    console.log("ApiConfig:", ApiConfig);
    app.locals.db = await connectDb();
  } catch (err) {
    console.log(err);
  }
})();

const port = Number(ApiConfig.PORT);
const server = app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);

export const shutdown = async () => {
  await Promise.allSettled([
    // redis.cache && redis.cache.quit(),
    mongo.client && mongo.client.close(),
    server && server.close(),
  ]);
  process.exit(0);
};
