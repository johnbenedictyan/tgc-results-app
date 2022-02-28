import { ReactElement } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import Layout from '../components/layout'

export default function Home() {
    return (
        <Container className='px-4 py-5'>
            <Row className='align-items-center g-lg-5 py-5'>
                <Col lg={7} className='align-items-center g-lg-5 py-5'>
                    <h1 className="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
                    <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                </Col>
                <Col md={10} lg={5} className='mx-auto'>
                    <Form className='p-4 p-md-5 border rounded-3 bg-light'>
                        <>
                            <FloatingLabel
                                controlId="floatingEmailLabel"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                        </>
                        <>
                            <FloatingLabel
                                controlId="floatingPasswordLabel"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control type="password" placeholder="password" />
                            </FloatingLabel>
                        </>
                        <Button className='w-100' variant='primary' size='lg' type='submit'>Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
