import "./config/alias";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import router from "./router";
import cors from "@koa/cors";
import koaHelmet from "koa-helmet";
import koaJson from "koa-json";
import schedules from "./schedules"; // 定时任务
import sessionMiddleware from "./middlewares/session.middleware";
import koaStatic from "koa-static";
import EnvConfig from "./config/env.config";
import { koaSwagger } from "koa2-swagger-ui";

const app = new Koa();

app.use(koaStatic("public")); // 配置项目默认顶郱文件处理
app.keys = EnvConfig.cookieSecretKeys; // 这是一个必需的配置项，用于设置签名的Cookie密钥。Koa使用这个密钥来对cookie进行签名，以防止篡改。它的值是一个字符串数组，每个字符串都是一个密钥。Koa会按照数组的顺序对cookie进行签名，如果其中一个密钥被篡改，则签名将无效。
app.use(sessionMiddleware(app)); // session中间件
app.use(bodyParser()); // request.body数据解析
app.use(loggerMiddleware); // 日志记录
app.use(cors()); // 跨域
app.use(koaHelmet()); // 安全的使用header
app.use(koaJson()); // 返回json
app.use(async (ctx, next) => {
    ctx.set(
        "Content-Security-Policy",
        "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com"
    );
    await next();
});
app.use(
    koaSwagger({
        routePrefix: "/swagger-html",
        swaggerOptions: {
            url: "/swagger-json",
        },
    })
);

app.use(router()); // 路由

app.listen(EnvConfig.appPort);

schedules.run(); // 执行定时任务
console.log("port:3000");
