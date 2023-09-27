import { ParameterizedContext } from "koa";

declare module "koa" {
  interface Request {
    params: {
      [key: string]: string;
    };
  }

  interface ContextState {
    params: { [key: string]: string };
  }
}
