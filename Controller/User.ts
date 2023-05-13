import { Request, Response } from "express";
import { User } from "../Models";

export const countUser = async (req: Request, res: Response) => {
  try {
    const user = User.length;
    if (!user) res.status(400).json({ message: "No user found" });
    res.status(200).json({
      success: true,
      userCount: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfos = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ success: false, message: "Invalid user" });
    const userFound = await User.findOne({ email: email });
    if (!userFound) res.json({ success: false, message: "User does not exist" });
    if (!userFound?.isVerified) res.json({ success: false, message: "User not verified" });

    res.status(200).json(userFound);

  } catch (error) {
    console.log(error);
  }
}

export const isActive = async (req: Request, res: Response) => {
  try {
    const { email } = req.query
    const user = await User.findOne({ email: email })
    res.status(200).json(user?.isVerified)
  } catch (error) {
    console.log(error)
  }
}

export const deactivate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    console.log("email => ", req.body)
    const user = await User.findOne({ email: email })
    console.log("user =====> ", user)
    // création d'un filtre de recherche pour trouver le document à mettre à jour
    const filterObj = { _id: user?._id };
    // création d'un objet de mise à jour
    const updateUser = { $set: { isVerified: false } };
    const userUpdated = await User.findByIdAndUpdate(filterObj, updateUser, { new: true })
    res.status(200).json(userUpdated?.isVerified)
  } catch (error) {
    console.log(error)
  }
}

