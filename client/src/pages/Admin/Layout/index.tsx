import { Group } from "@mantine/core";
import AdminNavBar from "../Components/AdminNav";
import { ReactNode } from "react";
import { Footer } from "../../../components/Footer";
import AdminHeader from "../Components/AdminHeader";

export default function Layout({children}: {children?: ReactNode}){
    return <>
        <AdminHeader />
        <Group>
            <AdminNavBar />
            {children}
        </Group>
        
        <Footer />

    </>
}