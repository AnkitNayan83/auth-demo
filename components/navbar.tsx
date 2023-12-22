import UserButton from "./user-button";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 font-semibold bg-zinc-600 text-white pr-20">
            <h1 className="text-xl">Auth Demo</h1>
            <UserButton />
        </div>
    );
};

export default Navbar;
