import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { AppState, User } from "../Models";

export const getState = async (req: Request, res: Response) => {
    try {
        const { email } = req.query

        const userFound = await User.findOne({ email: email });

        const appStates = await User.findById(userFound?._id).populate({ path: 'AppState', options: { strictPopulate: false } });

        res.status(200).json(appStates?.AppState);

        /* if (!token) return res.json({ success: false, message: "Invalid token" })

        jwt.verify(token as string, process.env.JWT as string, async (err, decoded: any) => {
            if (err)
                return res.json({ success: false, message: "token expired" });
            
        } */

    } catch (error) {
        console.log(error)
    }
}

export const setState = async (req: Request, res: Response) => {
    try {
        const { email } = req.query
        const { appStatesInput } = req.body;

        const userFound = await User.findOne({ email: email });

        const userAppStatesFound = await User.findById(userFound?._id).populate({ path: 'AppState', options: { strictPopulate: false } });

        // création d'un filtre de recherche pour trouver le document à mettre à jour
        const filterObj = { _id: userAppStatesFound?.AppState?._id };

        const appStatesUpdated = await AppState.findByIdAndUpdate(filterObj, appStatesInput, { new: true })


        res.status(200).json(appStatesUpdated);

        /* if (!token) return res.json({ success: false, message: "Invalid token" })

        jwt.verify(token as string, process.env.JWT as string, async (err, decoded: any) => {
            if (err)
                return res.json({ success: false, message: "token expired" });
            
        } */



    } catch (error) {
        console.log(error)
    }
}