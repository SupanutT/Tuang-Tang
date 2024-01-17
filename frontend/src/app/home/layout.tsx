import { ReactNode } from "react";
import TopMenu from "../components/TopMenu";

export default function HomeLayout ( { children }: { children: ReactNode } ) {
    return (
        <div>
            <TopMenu />
            {children}
        </div>
    );
}
