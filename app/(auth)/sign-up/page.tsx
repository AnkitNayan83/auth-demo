import RegisterCard from "@/components/register-card";
import currentUser from "@/lib/currentUser";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
    const user = await currentUser();
    if (user) {
        return redirect("/initial-setup");
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <RegisterCard />
        </div>
    );
};

export default RegisterPage;
