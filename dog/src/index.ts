import http from "http";
import requestPromiseNative from "request-promise-native";

import app from "./app";

const main = async () => {
  console.log("starting app");
  http.createServer(app(requestPromiseNative).callback()).listen(8080);
  console.log("listening port 8080");
};

main().catch(console.error);
