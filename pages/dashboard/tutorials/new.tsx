import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import TutorialForm from "../../../components/forms/tutorialForm";

export default function NewTutorialPage() {
    const router = useRouter();
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">New Tutorial</h1>
            </div>
            <Row>
                <Col>
                    <TutorialForm newTutorial={true} router={router} />
                </Col>
            </Row>
        </>
    )
}

NewTutorialPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}