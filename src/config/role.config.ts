import { AccessControl } from "accesscontrol";
import ModelNames from "../models/common/modelNames";

const ac = new AccessControl();

/**
 * 角色列表
 */
enum ROLES {
    ANONYMOUS = "anonymous",
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
}

// 公共字段
const commonFields = ["*", "!_id", "!__v"];

/**
 * 角色权限配置
 */
ac.grant(ROLES.ANONYMOUS).createOwn(ModelNames.users, ["*", "!userId", "!status", "!role"]);
ac.grant(ROLES.USER)
    .extend(ROLES.ANONYMOUS)
    .deleteOwn(ModelNames.users)
    .updateOwn(ModelNames.users, [...commonFields, "!userId", "!status", "!createdDate"])
    .readOwn(ModelNames.users, [...commonFields]);

ac.grant(ROLES.ADMIN)
    .extend(ROLES.ANONYMOUS)
    .extend(ROLES.USER)
    .createAny(ModelNames.users, [...commonFields, "userId"])
    .deleteAny(ModelNames.users)
    .updateAny(ModelNames.users, [...commonFields, "userId"])
    .readAny(ModelNames.users, [...commonFields]);

ac.grant(ROLES.SUPERADMIN).extend(ROLES.ADMIN);

export { ac, ROLES };
