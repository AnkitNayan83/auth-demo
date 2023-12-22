"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/initial-setup");
        }
    }, [status, router]);

    const handelLogin = async () => {
        signIn("credentials", { email, password, redirect: false }).then((callback) => {
            console.log(callback);
            if (callback?.error) {
                window.alert("invalid credentials");
            }
            if (callback?.ok) {
                router.push("/initial-setup");
            }
        });
    };

    return (
        <div className="h-[400px] w-[400px] rounded-sm bg-zinc-200 p-4 flex flex-col gap-5 items-center">
            <h1 className="font-bold text-xl">Login</h1>
            <div className="flex flex-col items-start justify-between gap-4 mt-10 w-full">
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
                    Login
                </Button>
            </div>

            <div
                className="bg-red-500 cursor-pointer p-2 rounded-md w-full flex justify-center text-white"
                onClick={() => signIn("google")}
            >
                Google
            </div>

            <p>
                New user?{" "}
                <a href="/sign-up" className="text-blue-500 underline font-bold">
                    Register
                </a>
            </p>
        </div>
    );
};

export default LoginCard;
