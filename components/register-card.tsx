"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const RegisterCard = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/initial-setup");
        }
    }, [status, router]);

    const handelLogin = async () => {
        try {
            await axios.post("/api/register", { email, name, password });
            router.push("/sign-in");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-[400px] w-[400px] rounded-sm bg-zinc-200 p-4 flex flex-col items-center">
            <h1 className="font-bold text-xl">Register</h1>
            <div className="flex flex-col items-start justify-between gap-4 mt-10 w-full mb-6">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="username"
                    className="w-full p-2"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="w-full p-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full p-2"
                />
                <Button className="w-full" onClick={handelLogin}>
                    Register
                </Button>
            </div>

            <div
                onClick={() => signIn("google")}
                className="bg-red-500 cursor-pointer p-2 rounded-md w-full text-white flex justify-center"
            >
                Google
            </div>
            <p>
                Existing user?{" "}
                <a href="/sign-up" className="text-blue-500 underline font-bold">
                    Login
                </a>
            </p>
        </div>
    );
};

export default RegisterCard;
