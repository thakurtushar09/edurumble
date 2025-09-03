import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/Models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { JWTPayload, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "myjwtsecret");

async function signJwt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, fullname, password } = await request.json();

    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
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
      fullname,
      password: hashedPassword,
      verifyCode,
      isVerified: false,
      verifyCodeExpiry,
    });

    await newUser.save();

    const token = await signJwt({
      _id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      isVerified: newUser.isVerified,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
        userId: newUser._id.toString(),
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}
