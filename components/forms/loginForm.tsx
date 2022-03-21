import { Field, FieldProps, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { NextRouter } from 'next/router';
import React from 'react';
import { Alert, Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';

// Shape of form values
interface FormValues {
    email: string;
    password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, status } = props;
    return (
        <Form>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    {
                        status && status.message && (
                            <Row>
                                <Col>
                                    <Alert variant='danger'>
                                        An API error has occurred. Please try again.
                                    </Alert>
                                </Col>
                            </Row>
                        )
                    }
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                            <Field type="text" name="email" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.email && !errors.email} />
                                )
                            }
                            />
                            {touched.email && !errors.email && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.email && errors.email && <BootstrapForm.Control.Feedback type="invalid">{errors.email}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                            <Field type="text" name="password" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.password && !errors.password} />
                                )
                            }
                            />
                            {touched.password && !errors.password && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.password && errors.password && <BootstrapForm.Control.Feedback type="invalid">{errors.password}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-4 text-center'>
                            <Button variant='primary' type="submit" disabled={isSubmitting} className='w-50'>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Form >
    );
};

// The type of props LoginForm receives
interface LoginFormProps {
    initialValues?: FormValues;
    router: NextRouter
}

// Wrap our form with the withFormik HoC
const LoginForm = withFormik<LoginFormProps, FormValues>({

    // Transform outer props into form values
    mapPropsToValues: props => {

        return {
            email: props.initialValues ?
                props.initialValues.email
                : null || '',
            password: props.initialValues ?
                props.initialValues.password
                : null || ''
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    },

    handleSubmit: (values, formikBag) => {
        // do submitting things
        const { setStatus, setSubmitting } = formikBag;

        const contentType = 'application/json'

        /* The POST method adds a new entry in the mongodb database. */
        const postData = async (values: any) => {
            let hasErrors = false;
            let res: any;
            try {
                const data = {
                    email: values.email,
                    password: values.password
                }
                res = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        Accept: contentType,
                        'Content-Type': contentType,
                    },
                    body: JSON.stringify(data),
                })

                // Throw error with status code in case Fetch API req failed
                if (!res.ok) {
                    hasErrors = true;
                    setStatus({ message: 'Error occurred' });
                    setSubmitting(false);
                }
            } catch (error) {
                hasErrors = true;
                setStatus({ message: 'Failed to login' });
                setSubmitting(false);
            }
            if (hasErrors == false) {
                // localStorage.setItem("token", )
                if(res != null){
                    let a:any = await res.json();
                    localStorage.setItem('token', a.token)
                    formikBag.props.router.push('/dashboard')
                }
            }
        }

        postData(values);          
    },
})(InnerForm);

export default LoginForm;