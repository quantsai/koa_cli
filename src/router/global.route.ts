import Router from "koa-router";
import { checkCaptcha, getCaptcha, upload } from "@/controllers/global.controllers";
import uploadFile from "@/middlewares/upload.middleware";

const router = new Router();

router.post("/upload", uploadFile("/cache").single("file"), upload);

router.get("/captcha", getCaptcha);
router.get("/captcha1", checkCaptcha);

export default router;
