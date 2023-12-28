import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function name() {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
});

export const User = model<TUser>("User", userSchema);
