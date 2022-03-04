import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonToolbar, Card, Col, ProgressBar, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import dbConnect from "../../../../lib/dbConnect";
import batchModel from "../../../../models/batchModel";
import submissionModel from "../../../../models/submissionModel";
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
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h3>Batches</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Header>
                                    <h5 className="mt-2">Batch 1</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col>
                                            <h6 className="mb-0">Tutorial #1</h6>
                                        </Col>
                                        <Col className="align-self-center" xl={6}>
                                            <ProgressBar now={60} label={`${60}%`} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <h6 className="mb-0">Tutorial #2</h6>
                                        </Col>
                                        <Col className="align-self-center" xl={6}>
                                            <ProgressBar now={40} label={`${40}%`} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <h6 className="mb-0">Tutorial #3</h6>
                                        </Col>
                                        <Col className="align-self-center" xl={6}>
                                            <ProgressBar now={90} label={`${90}%`} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
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
    const batches = await batchModel.find({ students: student._id }, '_id batchCode').lean();
    batches.forEach((ele, index, arr) => {
        arr[index]._id = arr[index]._id.toString();
    })

    const submissions = await submissionModel.find({ email: student.email }).lean();
    submissions.forEach((ele, index, arr) => {
        arr[index]._id = arr[index]._id.toString();
    })
    student._id = student._id.toString()

    console.log(batches);
    console.log(submissions)


    return { props: { student, batches } }
}

export default SingleStudentPage;