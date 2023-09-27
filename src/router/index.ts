import combineRouters from "koa-combine-routers";

import globalRoute from "./global.route";
import oauthRoute from "./oauth.route";
import usersRoute from "./users.route";
import swaggerRoute from "@/router/swagger.route";

const router = combineRouters(swaggerRoute, globalRoute, oauthRoute, usersRoute);

export default router;
