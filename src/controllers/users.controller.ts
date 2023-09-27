import Koa, { Context, Next } from "koa";
import STATUS from "../utils/STATUS";
import { ROLES } from "../config/role.config";
import ModelNames from "../models/common/modelNames";
import UsersModel, { IUsers, UsersTool } from "../models/users.model";
import Router from "koa-router";

export const create = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
    next: Next
) => {
    // 根据角色，过滤掉无权限的数据
    const role = ctx.state.role || ROLES.ANONYMOUS;
    const usersTool = new UsersTool();
    const action = role === ROLES.ADMIN ? "createAny" : "createOwn";
    const permission = usersTool.createPermission(role, action, ModelNames.users);
    const body = permission.filter(ctx.request.body);
    const statusCode = await usersTool.create(body);
    ctx.body = STATUS[statusCode];
};

export const deleteUsers = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
    next: Next
) => {
    const usersTool = new UsersTool();
    const state = ctx.state;
    const params = ctx.params;
    const user = await usersTool.getOne<IUsers>({ userId: params.userId }, UsersModel);

    // 用户不存在
    if (!user) return (ctx.body = STATUS[101903]);

    // 超级管理员账号不能删除
    if (user.role === ROLES.SUPERADMIN) return (ctx.body = STATUS[101003]);

    // 非超管不能删除管理员
    const canDeleteOtherUsers = [ROLES.SUPERADMIN, ROLES.ADMIN].some(item => item === state.role);
    if (state.role !== ROLES.SUPERADMIN && user.role === ROLES.ADMIN)
        return (ctx.body = STATUS[101004]);

    // 非管理员不能删除别人账号
    if (!canDeleteOtherUsers && state.userId !== params.userId) return (ctx.body = STATUS[403]);

    // 删除
    const deleteResult = await UsersModel.deleteOne({ userId: params.userId });

    // 删除结果
    if (!deleteResult.acknowledged || !deleteResult.deletedCount) return (ctx.body = STATUS[501]);

    return (ctx.body = { ...STATUS[200], data: { userId: params.userId } });
};

/**
 * @api {put} /users/:userId?type=1 update user
 * @apiName update user
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiDeprecated 请使用**版本
 * @apiDescription 描述
 *
 * @apiPermission Client
 *
 * @apiHeader {String} Authorization Bearer {TOKEN}
 *
 * @apiParam (Parameter) {String} userId 用户ID
 * @apiParam (Body) {String} [nickname] 昵称
 * @apiParam (Body) {Number} [age] 年龄
 *
 * @apiSuccess {Number} code 200
 * @apiSuccess {Object} data 数据.
 * @apiSuccess {String} data.nickname 昵称.
 * @apiSuccess {Number} data.age 年龄.
 * @apiSuccess {Object[]} data.list 列表
 * @apiSuccess {String} data.list.key1 元素1
 * @apiSuccess {Number} data.list.key2 元素2
 *
 * @apiSuccessExample {json} Success-Response
 *      {
 *          nickname:'',
 *          age:18,
 *          list:[{
 *              key1:'',
 *              key2:0
 *          }]
 *      }
 * */
export const update = async (ctx: Context, next: Next) => {
    ctx.body = "update";
};

export const get = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
) => {
    ctx.body = { a: "cq1" };
};
