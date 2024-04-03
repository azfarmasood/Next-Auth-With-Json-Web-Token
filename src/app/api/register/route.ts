import prisma from "@/helpers/prisma"
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt"

interface Registration_Data{
    email: string;
    password: string;
}

export async function POST (request:NextRequest) {
    try {
        const body:Registration_Data = await request.json();
        const { email, password } = body;

        if(!email && !password){
            return NextResponse.json({
                status: 400,
                message: "Email and password are required"
            });
        }

        const user = await prisma.users.create({
            data: {
                email: email.toLowerCase(),
                password: await bcrypt.hash(password,10)
            }
        });

        const { password: hashpassword, ...result  } = user
        return NextResponse.json({ result }, {status: 201})
    } 
    catch (error) {
        console.error(error)
        return NextResponse.json({message: "Some thing went wrong creating your account", result: error}, {status: 500})
    }
}