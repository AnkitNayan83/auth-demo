"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/initial-setup");
        }
    }, [status, router]);

    const handelLogin = () => {
        setIsLoading(true);
        signIn("credentials", { email, password, redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    window.alert("invalid credentials");
                }
                if (callback?.ok) {
                    router.push("/initial-setup");
                }
            })
            .catch(() => window.alert("something went wrong"))
            .finally(() => setIsLoading(false));
    };

    const oAuthSignIn = (type: string) => {
        setIsLoading(true);
        signIn("google", { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    window.alert("Invalid credentials");
                }

                if (callback?.ok) {
                    window.alert("hii");
                    router.push("/initial-setup");
                }
            })
            .catch(() => window.alert("something went wrong"))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="w-[400px] rounded-sm bg-zinc-200 p-4 flex flex-col gap-5 items-center">
            <h1 className="font-bold text-xl">Login</h1>
            <div className="flex flex-col items-start justify-between gap-4 mt-10 w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="w-full p-2"
                    disabled={isLoading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full p-2"
                    disabled={isLoading}
                />
                <Button className="w-full" disabled={isLoading} onClick={handelLogin}>
                    Login
                </Button>
            </div>

            <div
                className="bg-red-500 cursor-pointer p-2 rounded-md w-full flex justify-center text-white"
                onClick={() => oAuthSignIn("google")}
            >
                Google
            </div>
            {isLoading && (
                <p className="flex items-center gap-2">
                    <h1 className="text-lg">Please wait...</h1>
                    <Loader2 className="w-6 h-6 animate-spin" />
                </p>
            )}

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
