import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";


const authorize = (permittedRoles?: number[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log(permittedRoles)

      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      const payload: any =jsonwebtoken.decode(token)
      const data = JSON.parse(JSON.stringify(payload))
      console.log(data)
      if (permittedRoles.includes(parseInt(data['custom:role'])) ){
        next()
      }
      else{
        return next(new UserNotAuthorizedException())
      }
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;