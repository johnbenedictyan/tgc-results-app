import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "react-bootstrap";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../../components/dashboardLayout";
import IUser from "../../../interfaces/user";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";

type StudentsHomeProps = {
    students: Array<IUser>;
}

const StudentsHome = ({ students }: StudentsHomeProps) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Students</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/students/new">
                        <Button variant="outline-secondary" size="sm">Create Student</Button>
                    </Link>
                </ButtonToolbar>
            </div>
            <Row className="border rounded mx-2">
                <Col>
                    <Row className="py-3 text-center">
                        <Col>
                            <h5 className="mb-0">Unique Id</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Name</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Email Address</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Actions</h5>
                        </Col>
                    </Row>
                    {students.map((student) => (
                        <Row className="border-top text-center py-3">
                            <Col className="my-auto">
                                <p className="mb-0">{student._id}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{student.name}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{student.email}</p>
                            </Col>
                            <Col>
                                <ButtonToolbar className="justify-content-center">
                                    <ButtonGroup>
                                        <Link href="/dashboard/students/[id]" as={`/dashboard/students/${student._id}`} >
                                            <Button variant="outline-secondary" size="sm" className="mx-2"><FiEye></FiEye></Button>
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Link href="/dashboard/students/[id]/edit" as={`/dashboard/students/${student._id}/edit`} >
                                            <Button variant="outline-secondary" size="sm" className="mx-2"><FiEdit></FiEdit></Button>
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button variant="outline-secondary" size="sm" className="mx-2"><FiTrash2></FiTrash2></Button>
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

StudentsHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await userModel.find({ role: "STUDENT" }).exec();
    const students = result.map((doc) => {
        const student: IUser = doc.toObject()
        student._id = student._id!.toString()
        return student
    })

    return { props: { students: students } }
}

export default StudentsHome;