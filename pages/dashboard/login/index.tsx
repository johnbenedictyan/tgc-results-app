import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import LoginForm from "../../../components/forms/loginForm";

export default function LoginPage() {
    const router = useRouter();
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Login</h1>
            </div>
            <Row>
                <Col>
                    <LoginForm router={router} />
                </Col>
            </Row>
        </>
    )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}