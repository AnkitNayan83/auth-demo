import Navbar from "@/components/navbar";
import currentUser from "@/lib/currentUser";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div>
            <h1 className="text-xl text-white font-bold text-center mt-6">Dashboard</h1>
        </div>
    );
};

export default DashboardPage;
