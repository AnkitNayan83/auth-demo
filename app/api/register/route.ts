import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();
        const check = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (check) {
            return new NextResponse("user already exists", { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("server error", { status: 500 });
    }
}
