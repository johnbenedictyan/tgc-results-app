import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonToolbar, Card, Col, ProgressBar, Row } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import IBatch from "../../../../interfaces/batch";
import ISubmission from "../../../../interfaces/submission";
import ITutorial from "../../../../interfaces/tutorial";
import dbConnect from "../../../../lib/dbConnect";
import batchModel from "../../../../models/batchModel";
import submissionModel from "../../../../models/submissionModel";
import tutorialModel from "../../../../models/tutorialModel";

interface IBatchShow {
    batchName: string;
    questions: Array<IQuestionShow>;
    noOfStudents: number;
}

interface IQuestionShow {
    code: string;
    noOfSubmissions: number;
    percentageAttempted: number;
    percentagePassed: number;
    percentageFailed: number;
}

type SingleTutorialProps = {
    tutorial: ITutorial;
    batches: Array<IBatchShow>;
}

const SingleTutorialPage = ({ tutorial, batches }: SingleTutorialProps) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{tutorial.tutorialCode}</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/tutorials/[id]/edit" as={`/dashboard/tutorials/${tutorial._id}/edit`}>
                        <Button variant="outline-secondary" size="sm">Edit Tutorial</Button>
                    </Link>
                </ButtonToolbar>
            </div>
            <Row>
                <Col>
                    <Row>
                        {batches.map((batch) => (
                            <Col xl={12} className="mb-5">
                                <Card>
                                    <Card.Header>
                                        <h5 className="mt-2">{batch.batchName}</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-3">
                                            <Col>
                                                <h6 className="mb-0">Question Number</h6>
                                            </Col>
                                            <Col>
                                                <h6 className="mb-0">Total Number of Submissions</h6>
                                            </Col>
                                            <Col>
                                                <h6 className="mb-0">Percentage Attempted</h6>
                                            </Col>
                                            <Col>
                                                <h6 className="mb-0">Percentage Pass</h6>
                                            </Col>
                                            <Col>
                                                <h6 className="mb-0">Percentage Failed</h6>
                                            </Col>
                                        </Row>
                                        {
                                            batch.questions.map((question) => (
                                                <Row className="mb-3">
                                                    <Col>
                                                        <h6 className="mb-0">{question.code}</h6>
                                                    </Col>
                                                    <Col>
                                                        <h6 className="mb-0">{question.noOfSubmissions}</h6>
                                                    </Col>
                                                    <Col className="align-self-center">
                                                        <ProgressBar now={question.percentageAttempted} label={`${question.percentageAttempted}%`} />
                                                    </Col>
                                                    <Col className="align-self-center">
                                                        <ProgressBar variant="success" now={question.percentagePassed} label={`${question.percentagePassed}%`} />
                                                    </Col>
                                                    <Col className="align-self-center">
                                                        <ProgressBar variant="danger" now={question.percentageFailed} label={`${question.percentageFailed}%`} />
                                                    </Col>
                                                </Row>
                                            ))
                                        }
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

SingleTutorialPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const tutorial: ITutorial = await tutorialModel.findById(params.id).lean();
    const allBatches: Array<IBatch> = await batchModel.find({}).lean();
    const batchesNeeded: Array<string> = await submissionModel.find({ tutorialCode: tutorial.tutorialCode }).distinct('batchCode').exec();
    const submissionsForThisTutorial: Array<ISubmission> = await submissionModel.find({ tutorialCode: tutorial.tutorialCode }).exec();
    let batches: Array<IBatchShow> = batchesNeeded.map((batchCode) => {
        let initialBatch: IBatchShow = {
            batchName: batchCode,
            questions: new Array<IQuestionShow>(),
            noOfStudents: allBatches.filter(batch => batch.batchCode == batchCode)[0].students.length
        }

        tutorial.questionCodes.forEach(questionCode => {
            let newQuestion: IQuestionShow = {
                code: questionCode,
                noOfSubmissions: 0,
                percentageAttempted: 0,
                percentageFailed: 0,
                percentagePassed: 0
            }
            initialBatch.questions.push(newQuestion)
        })

        return initialBatch;
    })

    batches.forEach((batchElement, _batchIndex, _batchArr) => {
        batchElement.questions.forEach((questionElement, questionIndex, questionArr) => {
            let submissionsForThisQn = submissionsForThisTutorial.filter(
                submissionElement =>
                (submissionElement.questionCode == questionElement.code
                    && submissionElement.batchCode == batchElement.batchName)
            );
            let submissionsPassed = submissionsForThisQn.filter(
                submissionElement => submissionElement.result.toUpperCase() == 'PASSED'
            );
            let submissionsFailed = submissionsForThisQn.filter(
                submissionElement => submissionElement.result.toUpperCase() == 'FAILED'
            );
            questionArr[questionIndex].noOfSubmissions = submissionsForThisQn.length;
            questionArr[questionIndex].percentageAttempted = batchElement.noOfStudents == 0
                ? 0
                : Math.round(submissionsForThisQn.length / batchElement.noOfStudents * 100);
            questionArr[questionIndex].percentageFailed = submissionsForThisQn.length == 0
                ? 0
                : Math.round(submissionsFailed.length / submissionsForThisQn.length * 100);
            questionArr[questionIndex].percentagePassed = submissionsForThisQn.length == 0
                ? 0
                : Math.round(submissionsPassed.length / submissionsForThisQn.length * 100);
        })
    });

    tutorial._id = tutorial._id!.toString()

    return { props: { tutorial, batches } }
}

export default SingleTutorialPage;