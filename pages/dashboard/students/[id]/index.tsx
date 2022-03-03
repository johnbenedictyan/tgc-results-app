import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import dbConnect from "../../../../lib/dbConnect";
import userModel from "../../../../models/userModel";

const SingleStudentPage = ({ student }: any) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{student.name}</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/students/[id]/edit" as={`/dashboard/students/${student._id}/edit`}>
                        <Button variant="outline-secondary" size="sm">Edit Student</Button>
                    </Link>
                </ButtonToolbar>
            </div>

        </>
    )
}

SingleStudentPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const student = await userModel.findById(params.id).lean()
    student._id = student._id.toString()

    return { props: { student } }
}

export default SingleStudentPage;