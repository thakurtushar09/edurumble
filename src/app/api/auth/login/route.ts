import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/Models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT, JWTPayload } from "jose";

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
    const { identifier, password } = await request.json();

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email before login" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const token = await signJwt({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        userId: user._id,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong during login." },
      { status: 500 }
    );
  }
}
