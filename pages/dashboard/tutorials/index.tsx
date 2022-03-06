import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Modal, Row } from "react-bootstrap";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import DashboardLayout from "../../../components/dashboardLayout";
import ITutorial from "../../../interfaces/tutorial";
import dbConnect from "../../../lib/dbConnect";
import tutorialModel from "../../../models/tutorialModel";

type TutorialsHomeProps = {
    tutorials: Array<ITutorial>;
}

const TutorialsHome = ({ tutorials }: TutorialsHomeProps) => {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [objString, setObjString] = useState('');
    const [objId, setObjId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        const contentType = 'application/json'
        if (objId) {
            try {
                fetch(`/api/tutorials/${objId}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: contentType,
                        'Content-Type': contentType,
                    }
                }).then(() => {
                    handleClose();
                    router.replace(router.asPath);
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Tutorials</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/tutorials/new">
                        <Button variant="outline-secondary" size="sm">Create Tutorial</Button>
                    </Link>
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
                    {tutorials.map((tutorial) => (
                        <Row className="border-top text-center py-3" key={tutorial._id}>
                            <Col className="my-auto">
                                <p className="mb-0">{tutorial.title}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{tutorial.group}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{tutorial.tutorialCode}</p>
                            </Col>
                            <Col className="my-auto">
                                <p className="mb-0">{tutorial.questionCodes.length}</p>
                            </Col>
                            <Col>
                                <ButtonToolbar className="justify-content-center">
                                    <ButtonGroup>
                                        <Link href="/dashboard/tutorials/[id]" as={`/dashboard/tutorials/${tutorial._id}`} >
                                            <Button variant="outline-secondary" size="sm" className="mx-2"><FiEye></FiEye></Button>
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Link href="/dashboard/tutorials/[id]/edit" as={`/dashboard/tutorials/${tutorial._id}/edit`} >
                                            <Button variant="outline-secondary" size="sm" className="mx-2"><FiEdit></FiEdit></Button>
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button variant="outline-secondary" size="sm" className="mx-2" onClick={() => {
                                            setObjString(tutorial.tutorialCode);
                                            setObjId(tutorial._id!);
                                            handleShow();
                                        }}><FiTrash2></FiTrash2></Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure you want to delete ${objString}?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
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

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await tutorialModel.find({})
    const tutorials = result.map((doc) => {
        const tutorial: ITutorial = doc.toObject()
        tutorial._id = tutorial._id!.toString()
        return tutorial
    })

    return { props: { tutorials: tutorials } }
}

export default TutorialsHome;