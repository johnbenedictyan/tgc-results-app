import { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../../components/dashboardLayout";

export default function StudentsHome() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Students</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Button variant="outline-secondary" size="sm">Create Student</Button>
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
                    <Row className="border-top text-center py-3">
                        <Col className="my-auto">
                            <p className="mb-0">abc123</p>
                        </Col>
                        <Col className="my-auto">
                            <p className="mb-0">Tan ah kow</p>
                        </Col>
                        <Col className="my-auto">
                            <p className="mb-0">asd@asd.com</p>
                        </Col>
                        <Col>
                            <ButtonToolbar className="justify-content-center">
                                <ButtonGroup>
                                    <Button variant="outline-secondary" size="sm" className="mx-2" href=""><FiEdit></FiEdit></Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button variant="outline-secondary" size="sm" className="mx-2" href=""><FiTrash2></FiTrash2></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col>
                    </Row>
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