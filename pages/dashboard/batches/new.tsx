import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import BatchForm from "../../../components/forms/batchForm";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";

const NewBatchPage = ({ modifiedStudents }: any) => {
    const router = useRouter();
    const initialValues = { allStudents: modifiedStudents };
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">New Batch</h1>
            </div>
            <Row>
                <Col>
                    <BatchForm initialValues={initialValues} newBatch={true} router={router} />
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

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const students = await userModel.find({ role: "STUDENT" }).lean();
    let modifiedStudents: Array<any> = [];
    students.forEach((element) => {
        modifiedStudents.push({
            _id: element._id.toString(),
            name: element.name
        })
    })

    return { props: { modifiedStudents: modifiedStudents } }
}

export default NewBatchPage;