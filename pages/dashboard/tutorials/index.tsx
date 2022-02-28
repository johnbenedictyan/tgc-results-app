import { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../../components/dashboardLayout";


export default function TutorialsHome() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Tutorials</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Button variant="outline-secondary" size="sm">Create Tutorial</Button>
                </ButtonToolbar>
            </div>
            <Row className="border rounded mx-2">
                <Col>
                    <Row className="py-3 text-center">
                        <Col>
                            <h5 className="mb-0">Title</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Group</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Tutorial Code</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">No of Questions</h5>
                        </Col>
                        <Col>
                            <h5 className="mb-0">Actions</h5>
                        </Col>
                    </Row>
                    <Row className="border-top text-center py-3">
                        <Col className="my-auto">
                            <p className="mb-0">DOM Hands On</p>
                        </Col>
                        <Col className="my-auto">
                            <p className="mb-0">Interactive Frontend</p>
                        </Col>
                        <Col className="my-auto">
                            <p className="mb-0">doms-hands-on</p>
                        </Col>
                        <Col className="my-auto">
                            <p className="mb-0">3</p>
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

TutorialsHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}