import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/CatchAsyncError";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../modules/userModel/user.interface";

const auth = (...requiredRoles: TuserRole[]) => {
  return CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      //   checking if the tokern is given
      if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorised");
      }
      //   cheaking if the token is valid
      Jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          console.log(decoded);
          if (err) {
            throw new AppError(httpStatus.NOT_FOUND, "You are not authorised");
          }
          const role = (decoded as JwtPayload).role;
          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.NOT_FOUND, "You are not authorised");
          }

          //   const { username, role } = decoded;
          req.user = decoded as JwtPayload;
          next();
        }
      );
    }
  );
};
export default auth;
