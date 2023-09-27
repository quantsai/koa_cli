// import koaMulter from "@koa/multer";
const koaMulter = require("@koa/multer");
import moment from "moment";
import { mkdirp } from "mkdirp";
import path from "path";

/**
 * 文件上传中间件
 * @param dirname 存储目录名，位于/public/upload/{{dirname}}/{{YYYY}}/{{MM}}/{{DD}}/{{timestamp.filename}}
 *
 * @example
 * router.post("/upload", uploadFile("/cache").single("file"), upload);
 */
const uploadFile = (dirname = "temp") => {
    const storage = koaMulter.diskStorage({
        destination: async (req: any, file: any, cb: any) => {
            const day = moment().format("YYYY/MM/DD");
            const dir = path.join("public/upload", dirname, day);
            await mkdirp(dir);
            cb(null, dir);
        },

        filename: (req: any, file: any, cb: any) => {
            const filename = `${Date.now()}.${file.originalname}`;
            cb(null, filename);
        },
    });
    return koaMulter({ storage });
};

export default uploadFile;
