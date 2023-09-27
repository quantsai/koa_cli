import session from "koa-session";
import Koa from "koa";
import EnvConfig from "../config/env.config";

const sessionConfig: Partial<session.opts<Koa.DefaultState, Koa.DefaultContext, any>> = {
    key: "myapp:sess", // 用于指定存储session的cookie名称
    maxAge: 24 * 60 * 60 * 1000,
    autoCommit: true, // 在响应结束时自动提交会话更改。默认为true。如果设置为false，则需要手动调用ctx.session.commit()来提交会话更改。
    overwrite: true, // 是否允许覆盖会话默认值。默认为true。如果设置为false，则不会覆盖现有的会话值。
    httpOnly: true, // 是否将会话cookie标记为HTTP Only。默认为true。如果设置为
    signed: true, // 配合app.keys使用
    rolling: false, // 每次刷新页面都会重置session过期时间
    renew: false, // 在session快过期时才重置时间
    secure: false, // true表示只有https可以访问
    sameSite: "lax", // 夸站点发送cookie只有get请求
    store: undefined, // 用于指定会话的存储方式。默认情况下，会话数据将存储在内存中，但您可以使用其他存储器，例如Redis或数据库，来持久化会话数据。您可以使用koa-session提供的MemoryStore，也可以使用其他第三方存储器。
    path: "/", // 用于指定会话cookie的路径。默认为/，表示会话cookie在整个网站中都可用。您可以根据需要设置不同的路径。
    domain: undefined, // 用于指定会话cookie的域。默认为当前网站的域名。您可以根据需要设置不同的域，例如.example.com，以便在子域名中共享会话cookie。
};

const sessionMiddleware = (app: Koa) => {
    return session(sessionConfig, app);
};

export default sessionMiddleware;
