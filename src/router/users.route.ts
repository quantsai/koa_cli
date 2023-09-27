import { create, get, deleteUsers } from "../controllers/users.controller";
import Router from "koa-router";
import validateRequest, { validateList } from "../middlewares/validateRequest.middleware";
import { jwtVerify } from "../middlewares/jwt.middleware";
import roleAccess from "../middlewares/roleAccess.middleware";
import ModelNames from "../models/common/modelNames";
import Koa from "koa";

const router = new Router({
    prefix: "/users",
});

router.post(
    "/",
    validateRequest({
        body: {
            username: validateList.username.required(),
            password: validateList.password.required(),
            phone: validateList.phone,
        },
    }),
    create
);

router.delete(
    "/:userId",
    jwtVerify,
    roleAccess("deleteOwn", ModelNames.users),
    validateRequest({
        params: { userId: validateList.id.required() },
    }),
    deleteUsers
);

router.get("/:userId", get);

export default router;
