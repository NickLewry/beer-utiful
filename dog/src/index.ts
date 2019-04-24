import http from "http";
import redis from "redis";
import requestPromiseNative from "request-promise-native";

import { RedisCache } from "./cache";
import app from "./app";

const main = async () => {
  const cache = new RedisCache(redis.createClient({ host: 'redis' }));
  console.log("starting app");
  http.createServer(app(requestPromiseNative, cache).callback()).listen(8080);
  console.log("listening port 8080");
};

main().catch(console.error);
