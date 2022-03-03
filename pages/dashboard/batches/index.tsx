import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "react-bootstrap";
import { FiEdit, FiUserPlus } from "react-icons/fi";
import DashboardLayout from "../../../components/dashboardLayout";
import IBatch from "../../../interfaces/batch";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";

type BatchesHomeProps = {
    batches: Array<IBatch>;
}

const BatchesHome = ({ batches }: BatchesHomeProps) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Batches</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/batches/new">
                        <Button variant="outline-secondary" size="sm">Create Batch</Button>
                    </Link>
                </ButtonToolbar>
            </div>
            <Row className="border rounded mx-2">
                <Col>
                    <Row className="py-3 text-center">
                        <Col>
                            <h5 className="mb-0">No.</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Batch Code</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Number of Students</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Actions</h5>
                        </Col>
                    </Row>
                    {batches.map((batch) => (
                        <Row className="border-top text-center py-3" key={batch._id}>
                            <Col className="my-auto">
                                <p className="mb-0">{batch._id}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{batch.batchCode}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{batch.students.length}</p>
                            </Col>
                            <Col>
                                <ButtonToolbar className="justify-content-center">
                                    <ButtonGroup>
                                        <Link href="/dashboard/batches/[id]/edit" as={`/dashboard/batches/${batch._id}/edit`} >
                                            <Button variant="outline-secondary" size="sm" className="mx-2"><FiEdit></FiEdit></Button>
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button variant="outline-secondary" size="sm" className="mx-2" href=""><FiUserPlus></FiUserPlus></Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </>
    )
}

BatchesHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await batchModel.find({})
    const batches = result.map((doc) => {
        const batch: IBatch = doc.toObject()
        batch._id = batch._id!.toString()
        for (let i = 0; i < batch.students.length; ++i) {
            batch.students[i] = batch.students[i].toString()
        }
        return batch
    })

    return { props: { batches: batches } }
}

export default BatchesHome;