import joi from "joi";

import { QueryOrderEnum } from "../enums/query-order.enum";

export class QueryParamsValidator {
    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        order: joi
            .string()
            .valid(
                ...Object.values(QueryOrderEnum),
                ...Object.values(QueryOrderEnum).map((item) => `-${item}`),
            ),
    });
}
