import InitialModel from "@/components/modals/initila-modal";
import currentUser from "@/lib/currentUser";
import { redirect } from "next/navigation";

const InitialSetup = async () => {
    const user = await currentUser();
    console.log(user);

    if (!user) {
        return redirect("/");
    }

    if (user.age !== null) {
        return redirect("/");
    }

    return <InitialModel />;
};

export default InitialSetup;
