import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import StudentForm from "../../../../components/forms/studentForm";
import dbConnect from "../../../../lib/dbConnect";
import userModel from "../../../../models/userModel";

const EditStudentPage = ({ student }: any) => {
    const router = useRouter();
    const initialValues = { ...student };
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Edit Student</h1>
            </div>
            <Row>
                <Col>
                    <StudentForm initialValues={initialValues} newStudent={false} router={router} />
                </Col>
            </Row>
        </>
    )
}

EditStudentPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const student = await userModel.findById(params.id).lean()
    student._id = student._id.toString();
    
    return { props: { student } }
}

export default EditStudentPage