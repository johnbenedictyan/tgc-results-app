import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import ISubmission from "../../../interfaces/submission";
import dbConnect from "../../../lib/dbConnect";
import submissionModel from "../../../models/submissionModel";
import moment from "moment";


type SubmissionsHomeProps = {
    submissions: Array<ISubmission>
}

const SubmissionsHome = ({ submissions }: SubmissionsHomeProps) => {
    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Submissions</h1>
            </div>
            <Row className="border rounded mx-2">
                <Col>
                    <Row className="py-3 text-center">
                        {/* <Col>
                            <h5 className="mb-0">Unique Id</h5>
                        </Col> */}
                        <Col>
                            <h5 className="mb-0">Question Code</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Batch Code</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Tutorial Code</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Email</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Submission Time</h5>
                        </Col>
                    </Row>
                    {
                        submissions.map((submission) => (
                            <Row className="border-top text-center py-3">
                                {/* <Col className="my-auto">
                                    <p className="mb-0">{submission._id}</p>
                                </Col> */}
                                <Col className="my-auto">
                                    <p className="mb-0">{submission.questionCode}</p>
                                </Col>
                                <Col className="my-auto">
                                    <p className="mb-0">{submission.batchCode}</p>
                                </Col>
                                <Col className="my-auto">
                                    <p className="mb-0">{submission.tutorialCode}</p>
                                </Col>
                                <Col className="my-auto">
                                    <p className="mb-0">{submission.email}</p>
                                </Col>
                                <Col className="my-auto">
                                    <p className="mb-0">{submission.dateTime}</p>
                                </Col>
                                {/* <Col>
                            <ButtonToolbar className="justify-content-center">
                                <ButtonGroup>
                                    <Button variant="outline-secondary" size="sm" className="mx-2" href=""><FiEdit></FiEdit></Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button variant="outline-secondary" size="sm" className="mx-2" href=""><FiTrash2></FiTrash2></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col> */}
                            </Row>
                        ))
                    }
                </Col>
            </Row>
        </>
    )
}

SubmissionsHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await submissionModel.find({});
    const submissions = result.map((doc) => {
        const submission: ISubmission = doc.toObject()
        submission._id = submission._id!.toString()
        submission.dateTime = moment(submission.dateTime).fromNow();
        return submission
    })
    console.log(submissions)

    return { props: { submissions: submissions } }
}

export default SubmissionsHome;