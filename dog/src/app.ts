import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";

import { getBeers } from "./beers";

export default (request: any) => {
  const router = new Router();

  router.get("/beers", async ctx => {
    const page = ctx.query.page;
    const beers = await getBeers(request, page);
    ctx.status = 200;
    ctx.body = beers;
  });

  return new Koa()
    .use(cors({ origin: "*" }))
    .use(router.routes())
    .use(router.allowedMethods());
};
