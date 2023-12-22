import Navbar from "@/components/navbar";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default PagesLayout;
