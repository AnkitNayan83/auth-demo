"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
    const { status, data } = useSession();

    return (
        <div>
            {status === "unauthenticated" && (
                <div>
                    <a href="/sign-in">
                        <Button>Sign In</Button>
                    </a>
                    <a href="/sign-up">
                        <Button variant="ghost">Sign Up</Button>
                    </a>
                </div>
            )}

            {status === "loading" && <Loader2 className="h-6 w-6 animate-spin" />}

            {data && status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center">
                            <div className="w-[90%] h-[90%] relative">
                                <Image
                                    src={data?.user?.image ? data.user.image : "./next.svg"}
                                    alt="profile"
                                    fill
                                    className="object-contain rounded-full"
                                />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-4">
                        <DropdownMenuItem>
                            <a href={`/user/${data.user?.name}`}>{data.user?.name}</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href="/dashboard">Dashboard</a>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-4">
                            <LogOut className="h-4 w-4" />
                            <p
                                onClick={() =>
                                    signOut({
                                        redirect: false,
                                    })
                                }
                            >
                                Log out
                            </p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};

export default UserButton;
