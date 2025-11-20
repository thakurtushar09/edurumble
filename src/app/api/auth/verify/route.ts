import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/Models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { userId, code } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      user.verifyCode = undefined;
      user.verifyCodeExpiry = undefined;
      await user.save();

      return NextResponse.json(
        {
          success: true,
          message: "User verified successfully",
        },
        { status: 200 }
      );
    }

    if (!isCodeValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code is incorrect",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Verification code has expired",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error during verification",
      },
      { status: 500 }
    );
  }
}
