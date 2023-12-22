import currentUser from "@/lib/currentUser";
import { redirect } from "next/navigation";

const UserInfoPage = async () => {
    const user = await currentUser();
    if (!user) {
        return redirect("/sign-up");
    }
    return (
        <div className="flex flex-col items-center gap-y-10">
            <p className="text-white ml-2 text-xl font-bold">User info:</p>
            <ul className="text-white ml-2">
                <li>{user.email}</li>
                <li>{user.name}</li>
            </ul>
        </div>
    );
};

export default UserInfoPage;
