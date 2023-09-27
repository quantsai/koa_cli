import Koa from "koa";
import { jwtCreate } from "../middlewares/jwt.middleware";
import { createResponseBody } from "../utils/utils";
import { ROLES } from "../config/role.config";
import UsersModel, { UsersTool } from "../models/users.model";
import STATUS from "../utils/STATUS";
import ModelNames from "../models/common/modelNames";
import Router from "koa-router";

export const create = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
) => {
    console.log(ctx.request.body);
    const { username, password } = ctx.request.body as { username: string; password: string };

    const usersTool = new UsersTool();
    // 查询用户
    let thisUser = await usersTool.getOne(
        {
            username,
            password: usersTool.encodePassword(password),
        },
        UsersModel
    );

    // 用户或密码错误
    if (!thisUser) return (ctx.body = STATUS[101005]);

    // 过滤权限数据
    thisUser = usersTool.filterDataWithRole(
        thisUser.role as ROLES,
        "readOwn",
        ModelNames.users,
        thisUser
    );

    // 用户或密码错误
    if (!thisUser) return (ctx.body = STATUS[101005]);

    const accessToken = jwtCreate({
        userId: thisUser.userId,
        role: thisUser.role,
    });
    ctx.body = createResponseBody({ accessToken, users: thisUser });
};
