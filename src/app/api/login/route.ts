import prisma from "@/helpers/prisma";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import { signInJwtAuth } from "@/helpers/jwt";

interface Sin_In {
    email: string;
    password: string;
}

export const POST = async (request:NextRequest) => {
    try {
        const body:Sin_In = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json({ message: "Both fields are required" }, { status: 400 });
        }
        const user = await prisma.users.findFirst({
            where: {
                email: email.toLowerCase()
            }
        })
        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 400 });
        }

        const bycrypting = await bcrypt.compare(password, user.password);
        if(bycrypting){
            const { password: hashpassword, ...result } = user;
            const token = signInJwtAuth(result)
            return NextResponse.json({ result: { ...result, token } }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Password incorrect" }, { status: 400 });
        }

    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong while trying to log in", result: error }, { status: 500 });
    }
}