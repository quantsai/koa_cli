export interface IStatus {
    code: number;
    message: string;
}
const STATUS: { [key: string | number]: IStatus } = {};

STATUS["200"] = { code: 200, message: "操作成功" };
STATUS["401"] = { code: 401, message: "身份令牌无效" };
STATUS["403"] = { code: 403, message: "权限不足" };

STATUS["500"] = { code: 500, message: "系统错误" };
STATUS["501"] = { code: 501, message: "数据库操作错误" };

// 其他：100 开头
STATUS["100001"] = { code: 100001, message: "验证码错误" };
STATUS["100002"] = { code: 100002, message: "query参数错误" };
STATUS["100003"] = { code: 100003, message: "params参数错误" };
STATUS["100004"] = { code: 100004, message: "body参数错误" };

/**
 * user相关：101*** 开头
 */
// 1010** 用户相关
STATUS["101001"] = {
    code: 101001,
    message: "用户名由6-20位的字母、数字、_、.组成",
};
STATUS["101002"] = {
    code: 101002,
    message: "用户名/手机/邮箱其中之一已存在",
};

STATUS["101003"] = {
    code: 101003,
    message: "超级管理员账号不能删除",
};
STATUS["101004"] = {
    code: 101004,
    message: "无权删除管理员",
};
STATUS["101005"] = {
    code: 101005,
    message: "用户名或密码错误",
};

// 1011** 开头是密码相关
STATUS["101100"] = { code: 101100, message: "密码6-20位字母和数字组成" };
STATUS["101101"] = { code: 101101, message: "密码错误" };

// 1019** user其他问题
STATUS["101901"] = { code: 101901, message: "手机号码格式错误" };
STATUS["101902"] = { code: 101902, message: "邮箱格式错误" };
STATUS["101903"] = { code: 101903, message: "该用户不存在" };

export default STATUS;
