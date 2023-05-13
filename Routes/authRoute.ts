import express from "express";
import { sendEmailtoUser, confirmUser, refreshToken } from "../Controller/auth";

const authRouter = express.Router();

authRouter.post("/", sendEmailtoUser);

authRouter.get("/confirm", confirmUser);

authRouter.get("/refresh", refreshToken);


export default authRouter;
