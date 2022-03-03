import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import TutorialForm from "../../../../components/forms/tutorialForm";
import dbConnect from "../../../../lib/dbConnect";
import tutorialModel from "../../../../models/tutorialModel";

const EditTutorialPage = ({ tutorial }: any) => {
    const router = useRouter();
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Edit Tutorial</h1>
            </div>
            <Row>
                <Col>
                    <TutorialForm initialValues={tutorial} newTutorial={false} router={router} />
                </Col>
            </Row>
        </>
    )
}

EditTutorialPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const tutorial = await tutorialModel.findById(params.id).lean()
    tutorial._id = tutorial._id.toString()

    return { props: { tutorial } }
}

export default EditTutorialPage