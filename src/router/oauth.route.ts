import Router from "koa-router";
import { create } from "../controllers/oauth.controller";
import validateRequest, { validateList } from "../middlewares/validateRequest.middleware";

const router = new Router({
    prefix: "/oauth",
});

router.post(
    "/",
    validateRequest({
        body: {
            username: validateList.username.required(),
            password: validateList.password.required(),
        },
    }),
    create
);

export default router;
