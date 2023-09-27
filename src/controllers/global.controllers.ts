import Koa, { Context } from "koa";
import SvgCaptcha from "svg-captcha";
import Router from "koa-router";
import STATUS from "../utils/STATUS";

export const upload = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
) => {
    ctx.body = {
        ...STATUS[200],
        data: {
            file: ctx.request.file.path.replace(/(public){0,1}(\\)/g, "/"),
        },
    };
};

// 生成验证码，并存储在ctx.session.captcha
export const getCaptcha = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
) => {
    const { data, text } = SvgCaptcha.create();
    // 把text存储到session中
    if (ctx.session === null) ctx.session = ctx.session!;
    ctx.session.captcha = text;

    ctx.body = data;
};

// 校验验证码
export const checkCaptcha = async (
    ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>
) => {
    console.log(ctx.session?.captcha);
    ctx.body = SvgCaptcha;
};
