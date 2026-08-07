import type { NextFunction, Request, Response } from "express";

import SearchService from "../../Services/Search/SearchService.js";
import customResponse from "../../Utils/customResponse.js";

class SearchController {

    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { query, limit } = req.body;
            const result = await SearchService.search(query,limit,);
            return customResponse.success(req, res, {
                message: "Search completed successfully",
                result,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new SearchController();