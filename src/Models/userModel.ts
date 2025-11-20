import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  fullname: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: Date;
  attemptedQuizzes: Types.ObjectId[]; 
}

const userSchema: Schema = new Schema(
  {
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

    fullname: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    verifyCode: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyCodeExpiry: {
      type: Date,
    },

    attemptedQuizzes: [
      { type: Schema.Types.ObjectId, ref: "AttemptedQuiz" }
    ],
  },
  { timestamps: true } 
);

export const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);
