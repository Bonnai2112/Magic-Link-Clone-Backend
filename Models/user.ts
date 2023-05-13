import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    token: {
      type: String
    },
    nNemonic: {
      type: String
    },
    publicAddress: {
      type: String
    },
    isVerified: {
      type: Boolean,
    },
    AppState: {
      type: Schema.Types.ObjectId,
      ref: 'AppState' // Référence au modèle Appstate
    }
  },

);

export const User = model("User", UserSchema);
