import LoginCard from "@/components/login-card";
import currentUser from "@/lib/currentUser";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const user = await currentUser();
    if (user) {
        return redirect("/initial-setup");
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <LoginCard />
        </div>
    );
};

export default LoginPage;
