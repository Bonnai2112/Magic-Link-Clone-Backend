import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: any) => {
  const authHeader =
    req.headers.authorization as string || req.headers.Authorization as string || "";


  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT as string, (err: VerifyErrors | null, decoded: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    next();
  });
};
