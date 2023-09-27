import Koa from "koa";
import { Context } from "vm";
import log4js from "log4js";

// 获取客户端IP地址
export const getClientIpAddress = (ctx: Context) => {
  const headers = ctx.headers;
  if (headers["x-forwarded-for"]) {
    const ipList = headers["x-forwarded-for"].split(",");
    return ipList[0];
  }
  return "0.0.0.0";
};

log4js.configure({
  pm2: true,
  appenders: {
    everything: {
      type: "dateFile",
      filename: __dirname + "/../../log/logs.log",
      maxLogSize: "10M",
      backups: 20,
    },
  },

  categories: {
    default: {
      appenders: ["everything"],
      level: "debug",
    },
  },
});

export const logger = log4js.getLogger();

export const loggerMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  // 请求开始时间
  const start = new Date();
  await next();

  // 结束时间
  const ms = Number(new Date()) - Number(start);

  // 打印出请求相关参数
  const remoteAddress = getClientIpAddress(ctx);

  const { status, method, url, request, body } = ctx;

  const logText = `${status} ${method} ${url} query: ${JSON.stringify(
    request.query,
  )} params:${JSON.stringify(ctx.request.params)} body: ${JSON.stringify(
    request.body,
  )} response:${JSON.stringify(body)}`;

  logger.info(logText);

  console.log(logText);
};
