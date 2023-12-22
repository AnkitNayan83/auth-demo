import currentUser from "@/lib/currentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const user = await currentUser();

        if (user === null) return new NextResponse("no user found", { status: 404 });

        if (!user.email) {
            return new NextResponse("no email found", { status: 404 });
        }

        const { age } = await req.json();

        const updatedUser = await db.user.update({
            where: {
                email: user?.email,
            },
            data: {
                age,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("server error", { status: 500 });
    }
}
