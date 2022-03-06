import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import BatchForm from "../../../../components/forms/batchForm";
import dbConnect from "../../../../lib/dbConnect";
import batchModel from "../../../../models/batchModel";
import userModel from "../../../../models/userModel";

const EditBatchPage = ({ batch, modifiedStudents }: any) => {
    const router = useRouter();
    const initialValues = { ...batch, allStudents: modifiedStudents };
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Edit Batch</h1>
            </div>
            <Row>
                <Col>
                    <BatchForm initialValues={initialValues} newBatch={false} router={router} />
                </Col>
            </Row>
        </>
    )
}

EditBatchPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const batch = await batchModel.findById(params.id).lean()
    const students = await userModel.find({ role: "STUDENT" }).lean();
    let modifiedStudents: Array<any> = [];
    students.forEach((element) => {
        modifiedStudents.push({
            _id: element._id.toString(),
            name: element.name
        })
    })
    batch._id = batch._id.toString()
    for (let i = 0; i < batch.students.length; ++i) {
        batch.students[i] = batch.students[i].toString()
    }

    return { props: { batch, modifiedStudents } }
}

export default EditBatchPage