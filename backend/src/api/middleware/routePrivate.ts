import {Request, Response, NextFunction}  from "express";
import boom  from "@hapi/boom";
import { JwtService } from "@/shared/services/JwtService";
import { IRequestWithUser } from "@/shared/interfaces/express";



export const routePrivate =  () => ((req: IRequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
  if (token) {
    try {
        const decode = new JwtService().verifyToken(token)
        req.user = decode.data
        next()
    } catch (error) {
        next(boom.unauthorized("Token invalid"))
    }
  } else {
    next(boom.unauthorized("Token not provided"));
  }
});
