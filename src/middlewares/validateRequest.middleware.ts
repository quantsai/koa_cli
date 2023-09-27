import Joi from "joi";
import Koa from "koa";
import STATUS from "../utils/STATUS";
import REGS from "../utils/REGS";
import Router from "koa-router";

export const validateList = {
    username: Joi.string().min(6).max(20).regex(REGS.username).messages({ "*": "101001" }),
    password: Joi.string().min(6).max(20).regex(REGS.password).messages({ "*": "101100" }),
    email: Joi.string().email().messages({ "*": "101901" }),
    phone: Joi.string().pattern(REGS.phone).messages({ "*": "101901" }),
    page: Joi.number().default(0),
    size: Joi.number().default(10),
    id: Joi.string(),
};

type IObject = {
    [key: string]: any;
};
type IValidateRequest = {
    query?: IObject;
    params?: IObject;
    body?: IObject;
};

/**
 * 参数校驗。使用方法：中间件
 * @param {IObject} query
 * @param {IObject} params
 * @param {IObject} body
 *
 * 使用示例：
 * router.get(
 *     "/:userId",
 *     validateRequest({
 *         query: { page: validateList.page, size: validateList.size },
 *         params: { userId: validateList.id.required() },
 *         body: { userId: validateList.id, page: validateList.page },
 *     }),
 *     get
 * );
 */
const validateRequest = ({ query, params, body }: IValidateRequest = {}) => {
    return (
        ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
        next: Koa.Next
    ) => {
        if (query) {
            const { error, value } = Joi.object(query).validate(ctx.request.query);
            if (error) {
                ctx.body = STATUS["100002"];
                return;
            } else (ctx.request.query as { [key: string]: string | number }) = value;
        }

        if (params) {
            const { error, value } = Joi.object(params).validate(ctx.request.params);
            if (error) return (ctx.body = STATUS["100003"]);
            else ctx.request.params = value;
        }
        if (body) {
            const { error, value } = Joi.object(body).validate(ctx.request.body);
            if (error) return (ctx.body = STATUS[error.message]);
            else ctx.request.body = value;
        }

        return next();
    };
};

export default validateRequest;
