import db from "./index";
import { createBaseSchema } from "./common/baseSchema";
import REGS from "../utils/REGS";
import { ROLES } from "../config/role.config";
import ModelNames from "./common/modelNames";
import BaseOperation from "./common/baseOperation";
import md5 from "md5";
import { nanoid } from "nanoid";
import { func } from "joi";

export interface IUsers {
    userId: string;
    username: string;
    password: string;
    role: string;
    status: number;
    phone?: string;
    email?: string;
    nickname?: string;
    gender?: string;
    age?: number;
    description?: string;
    [key: string]: any;
}

const UsersSchema = new db.Schema({
    userId: { type: String, require: true, unique: true, index: true },
    username: { type: String, require: true, unique: true, index: true, trim: true },
    password: { type: String, require: true },
    role: { type: String, require: true, default: ROLES.USER, enum: [...Object.values(ROLES)] },
    status: { type: Number, default: 1, enum: [1] },
    phone: { type: String, unique: true, sparse: true, index: true },
    email: { type: String, unique: true, sparse: true, match: REGS.email, index: true },
    nickname: { type: String, validate: (content: string) => content.length < 8 },
    gender: { type: String, default: "unknown", enum: ["unknown", "male", "female"] },
    age: { type: Number, validate: (content: number) => content > 0 && content < 120 },
    description: { type: String, validate: (content: string) => content.length <= 60 },

    ...createBaseSchema,
});

const UsersModel = db.model<IUsers>("user", UsersSchema, ModelNames.users);

export default UsersModel;

export interface ICreateBody {
    username: string;
    password: string;

    [key: string]: string | number;
}

export class UsersTool extends BaseOperation {
    async create(body: ICreateBody) {
        // 初始化数据
        body.password = this.encodePassword(body.password);
        body.userId = await this.createId(UsersModel);
        const { userId, username, phone, email } = body;

        // 查重
        const count = await this.getQueryCount(
            {
                $or: [
                    { username },
                    { email: { $eq: email, $ne: null } },
                    { phone: { $eq: phone, $ne: null } },
                ],
            },
            UsersModel
        );
        if (count) return Promise.resolve(101002);

        const user = new UsersModel(body);
        let statusCode = 200;
        try {
            await user.save();
        } catch (err) {
            statusCode = 501;
        }
        return Promise.resolve(statusCode);
    }

    async delete(query: any) {
        console.log("q", query);
        const { acknowledged, deletedCount } = await UsersModel.deleteOne(query);
        console.log(acknowledged, deletedCount);
        if (acknowledged && deletedCount === 0) return Promise.resolve(101903);
        else if (deletedCount >= 1) return Promise.resolve(200);
        else return Promise.resolve(501);
    }
}
