import { Group } from "@mantine/core";
import { ReactNode } from "react";
import { Footer } from "../../../components/Footer";
import AdminHeader from "../Components/AdminHeader";

export default function Layout({children}: {children?: ReactNode}){
    return <>
        <div style = {{minHeight : '100vh', display: 'flex', flexDirection:'column'}}>
            <AdminHeader />
            <Group>
                {children}
            </Group>
            
            <Footer />

        </div>

    </>
}