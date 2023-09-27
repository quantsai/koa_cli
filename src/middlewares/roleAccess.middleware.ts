import ModelNames from "../models/common/modelNames";
import Koa from "koa";
import STATUS from "../utils/STATUS";
import { ac } from "../config/role.config";
import { Query } from "accesscontrol";
import Router from "koa-router";

/*
 * 功能：
 *       判断该角色是否满足操作权限
 *
 * 使用方式：
 *       路由中间件，放在jwtVerify后面
 * router.get(
    "/:userId",
    jwtVerify,
    roleAccess("readOwn", ModelNames.users),
    validateRequest({
        params: { userId: validateList.id.required() },
    }),
    get
);
 *
 * */
const roleAccess = (action: keyof Query, resource: ModelNames) => {
    return async (
        ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
        next: Koa.Next
    ) => {
        const role = ctx.state.role;
        if (!role) return (ctx.body = STATUS[403]);

        let errorCode = null;
        try {
            const permission = ac.can(role)[action](resource);
        } catch (err) {
            errorCode = 403;
        }
        if (errorCode) return (ctx.body = STATUS[errorCode]);
        await next();
    };
};

export default roleAccess;
