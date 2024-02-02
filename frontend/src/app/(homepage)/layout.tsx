import { ReactNode } from "react";
import TopMenu from "../components/TopMenu";


export default function allBillLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-full">
            <TopMenu />
            {children}
        </div>
    );
}
