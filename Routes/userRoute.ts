import express from "express";
import { countUser, deactivate, getUserInfos, isActive } from "../Controller/User";
import { getState, setState } from "../Controller/AppState";
import {verifyJWT} from "../Middleware/VerifyJWT";

const userRouter = express.Router();

userRouter.get("/", verifyJWT, countUser);
userRouter.get("/userInfos", getUserInfos);
userRouter.get("/isActive", isActive);
userRouter.post("/deactivate", deactivate);
userRouter.get("/getStates", getState);
userRouter.post("/setStates", setState);

export default userRouter;
