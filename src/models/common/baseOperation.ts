import { ac, ROLES } from "../../config/role.config";
import ModelNames from "./modelNames";
import { Permission, Query } from "accesscontrol";
import md5 from "md5";
import EnvConfig from "../../config/env.config";
import { nanoid } from "nanoid";
import db from "../index";
import { randomUUID } from "crypto";
import { v4 as uuid } from "uuid";

export default class BaseOperation {
    // 密码加密
    encodePassword(password: string) {
        return md5(md5(password) + EnvConfig.passwordSecretKey);
    }

    async createId(Model: db.Model<any> | undefined = undefined): Promise<string> {
        return Promise.resolve(uuid());
    }

    createPermission(role: ROLES, action: keyof Query, model: ModelNames) {
        return ac.can(role)[action](model) as Permission;
    }

    filterDataWithPermission(permission: Permission, data: any) {
        return permission.filter(data);
    }

    // 通过role筛选数据
    filterDataWithRole(role: ROLES, action: keyof Query, model: ModelNames, data: any) {
        const permission = this.createPermission(role, action, model);
        return this.filterDataWithPermission(permission, data);
    }

    /**
     * 获取一条数据
     * @param query 查询条件
     * @param Model 指定数据模型
     */
    async getOne<T>(query: any, Model: db.Model<T>) {
        return (await Model.findOne(query).lean().exec()) as T | null;
    }

    /**
     * 获取满足条件的查询数量
     * @param query 查询条件
     * @param Model 指定数据模型
     */
    async getQueryCount(query: any, Model: db.Model<any>) {
        return await Model.countDocuments(query).exec();
    }
}
