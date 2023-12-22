import { db } from "./db";
import getSession from "./getSession";

const currentUser = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return null;
    }

    try {
        const user = await db.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!user) return null;

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default currentUser;
