import Router from "koa-router";
import { koaSwagger } from "koa2-swagger-ui";
import { swaggerSpec } from "../../swagger.config";

const router = new Router();

router.get("/swagger-json", async ctx => {
    ctx.body = swaggerSpec;
});
export default router;
