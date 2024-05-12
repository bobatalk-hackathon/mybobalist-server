import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

interface RequestWithUser extends Request {
  user?: UserPayload;
}

export const requireAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the token from cookies instead of the authorization header
  const token = req.cookies.AuthToken;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decodedUser: any) => {
      if (err) {
        return res.status(403).send("Invalid token.");
      }
      req.user = decodedUser as UserPayload; // assign the user payload to the request object
      next(); // continue to the next middleware function
    }
  );
};
