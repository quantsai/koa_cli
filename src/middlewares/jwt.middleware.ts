import jwt from "jsonwebtoken";
import Koa from "koa";
import STATUS from "../utils/STATUS";
import EnvConfig from "../config/env.config";
import Router from "koa-router";

/**
 * 功能：
 *      1. 验证token
 *      2. 解析token，把token中的userId、role、status等内容放到ctx.state中
 *
 * 使用方式：
 *      路由中间件，放在其他中间件前面
 *      router.put('/:userId',jwtVerify,roleAccess('updateOwn','users'), routes.update)
 *
 * */
export const jwtVerify = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
    next: Koa.Next
) => {
    const authorization = ctx.request.header.authorization;
    if (!authorization) return (ctx.body = STATUS[401]);
    const token = authorization.split(" ")[1];
    if (!token) return (ctx.body = STATUS[401]);

    let errorCode = null;
    try {
        ctx.state = jwt.verify(token, EnvConfig.jwtSecretKey);
    } catch (error) {
        errorCode = 401;
    }

    if (errorCode) return (ctx.body = STATUS[401]);
    await next();
};

/**
 * create jwt token
 * @param payload token中存储的数据 {userId,role}
 */
export const jwtCreate = (payload: any) => {
    return jwt.sign(payload, EnvConfig.jwtSecretKey);
};
