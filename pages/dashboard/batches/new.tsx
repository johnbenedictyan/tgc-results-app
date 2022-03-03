import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import BatchForm from "../../../components/forms/batchForm";

export default function NewBatchPage() {
    const router = useRouter();
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">New Batch</h1>
            </div>
            <Row>
                <Col>
                    <BatchForm newBatch={true} router={router} />
                </Col>
            </Row>
        </>
    )
}

NewBatchPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}