import { Response, NextFunction } from "express";
import boom from "@hapi/boom"
import { IRequestWithUser } from "@/shared/interfaces/express";

const checkRole = (...roles) => {
  return async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (roles.includes(user.role)) {
        return next()
    }else {
        next(boom.forbidden("you don't have permission"))
    }
  }
};

export default checkRole