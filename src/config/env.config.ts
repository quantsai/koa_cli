// 公共配置
const BASE = {
    cookieSecretKeys: ["koa", "caiquan", "scc"], // cookie加密码/解密码
    jwtSecretKey: "jwt.caiquan", //jwt加密码/解密码
    passwordSecretKey: "password.caiquan", //密码加密码/解密码
};

// 开发环境
const DEV = {
    dbUrl: "mongodb://127.0.0.1:27017/gl", //gl是库名
    appPort: 3000,
};

// 生产环境
const PROD = {
    dbUrl: "mongodb://127.0.0.1:27017/gl", //gl是库名
    appPort: 3000,
};

const ENV = process.env.NODE_ENV === "development" ? DEV : PROD;
const EnvConfig = Object.assign(BASE, ENV);

export default EnvConfig;
