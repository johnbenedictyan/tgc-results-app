import { ReactElement } from "react";
import DashboardLayout from "../../components/dashboardLayout";

export default function DashboardHome() {
    return (
        <>
            <div className="pt-3 pb-2 mb-3">
                <h1 className="h2">Dashboard</h1>
            </div>
        </>
    )
}

DashboardHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}