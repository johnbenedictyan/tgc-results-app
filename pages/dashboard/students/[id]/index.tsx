import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonToolbar, Card, Col, ProgressBar, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import IBatch from "../../../../interfaces/batch";
import ISubmission from "../../../../interfaces/submission";
import IUser from "../../../../interfaces/user";
import dbConnect from "../../../../lib/dbConnect";
import batchModel from "../../../../models/batchModel";
import submissionModel from "../../../../models/submissionModel";
import userModel from "../../../../models/userModel";

interface ITutorialShow {
    code: string;
    percentageAttempted: number;
}
interface IBatchShow {
    code: string;
    tutorials: Array<ITutorialShow>
}
type SingleStudentPageProps = {
    student: IUser;
    modifiedBatches: Array<IBatchShow>;
}
const SingleStudentPage = ({ student, modifiedBatches }: SingleStudentPageProps) => {
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
                        {modifiedBatches.map((batch) => (
                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h5 className="mt-2">{batch.code}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {batch.tutorials.map((tutorial) => (
                                            <Row className="mb-3">
                                                <Col>
                                                    <h6 className="mb-0">{tutorial.code}</h6>
                                                </Col>
                                                <Col className="align-self-center" xl={6}>
                                                    <ProgressBar now={tutorial.percentageAttempted} label={`${tutorial.percentageAttempted}%`} />
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
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

    const student: IUser = await userModel.findById(params.id).lean()
    const batches: Array<IBatch> = await batchModel.find({ students: student._id }, '_id batchCode').lean();
    batches.forEach((ele, index, arr) => {
        arr[index]._id = arr[index]._id!.toString();
    })

    const submissions: Array<ISubmission> = await submissionModel.find({ email: student.email }).lean();
    submissions.forEach((ele, index, arr) => {
        arr[index]._id = arr[index]._id!.toString();
    })
    student._id = student._id!.toString()

    console.log(batches);
    console.log(submissions)

    const tutorialsNeeded = await submissionModel.find({ email: student.email }).distinct('tutorialCode').lean();

    // console.log(tutorialsNeeded);
    const modifiedBatches = batches.map((batchObj) => {
        const tutorials = tutorialsNeeded.map((tutorialCode) => {
            let noOfQuestions = submissions.filter((submissionObj) => {
                return (
                    submissionObj.tutorialCode == tutorialCode &&
                    submissionObj.batchCode == batchObj.batchCode
                )

            }).length
            let noOfQuestionsAttempted = submissions.filter((submissionObj) => {
                return (
                    submissionObj.tutorialCode == tutorialCode &&
                    submissionObj.batchCode == batchObj.batchCode &&
                    submissionObj.result.toUpperCase() != "NO ATTEMPT"
                )
            }).length

            return {
                code: tutorialCode,
                percentageAttempted: noOfQuestions == 0
                    ? 0
                    : Math.round(noOfQuestionsAttempted / noOfQuestions * 100)
            }
        })
        return {
            code: batchObj.batchCode,
            tutorials: tutorials
        }
    })
    const tutorials = tutorialsNeeded.map((tutorialCode) => {
        let noOfQuestions = submissions.filter((submissionObj) => {
            return submissionObj.tutorialCode == tutorialCode
        }).length
        let noOfQuestionsAttempted = submissions.filter((submissionObj) => {
            return (
                submissionObj.tutorialCode == tutorialCode &&
                submissionObj.result.toUpperCase() != "NO ATTEMPT"
            )
        }).length

        return {
            code: tutorialCode,
            percentageAttempted: noOfQuestions == 0
                ? 0
                : Math.round(noOfQuestionsAttempted / noOfQuestions * 100)
        }
    })

    console.log(tutorials)
    console.log(modifiedBatches[0].tutorials)


    return { props: { student, modifiedBatches } }
}

export default SingleStudentPage;