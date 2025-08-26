import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/Models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, firstname, lastname, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingUserVerifiedByEmail) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    const newUser = new UserModel({
      username,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      verifyCode,
      isVerified: false,
      verifyCodeExpiry,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
        userId: newUser._id,
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}
