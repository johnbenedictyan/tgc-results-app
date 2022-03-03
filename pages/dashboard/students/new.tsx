import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import StudentForm from "../../../components/forms/studentForm";

export default function NewStudentPage() {
    const router = useRouter();
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">New Student</h1>
            </div>
            <Row>
                <Col>
                    <StudentForm newStudent={true} router={router} />
                </Col>
            </Row>
        </>
    )
}

NewStudentPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}