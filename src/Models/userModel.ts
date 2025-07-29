import mongoose, { Schema, Document } from "mongoose";
export interface User extends Document {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: Date;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },

  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },

  lastname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  verifyCode: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
});

export const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);
