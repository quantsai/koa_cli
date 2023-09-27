import STATUS from "./STATUS";

/**
 * Create a response body with status code 200 and data
 * @param data object of response data
 */
export const createResponseBody = (data: { [key: string]: any }) => ({ ...STATUS[200], data });
