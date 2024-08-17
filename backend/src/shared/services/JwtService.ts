import config from "@/config";
import jwt from "jsonwebtoken"
import { Service } from "typedi";

@Service()
export class JwtService {
    signToken(payload: any, expires: string | number = "24h"): string {
        console.log(expires, 'expire');
        
        return jwt.sign({data: payload}, config.jwt_key, { expiresIn: expires });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, config.jwt_key);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    decodeToken(token: string): any {
        return jwt.decode(token);
    }

}