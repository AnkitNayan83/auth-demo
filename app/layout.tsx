import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthContext from "@/components/context/auth-context";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Auth Demo",
    description: "Tutorial for next auth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(font.className, "bg-[#313338]")}>
                <AuthContext>{children}</AuthContext>
            </body>
        </html>
    );
}
