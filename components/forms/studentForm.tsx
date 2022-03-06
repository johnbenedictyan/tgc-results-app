import { Field, FieldProps, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { NextRouter } from 'next/router';
import React from 'react';
import { Alert, Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import { mutate } from 'swr';
import IUser from "../../interfaces/user";

// Shape of form values
interface FormValues {
    email: string;
    password: string;
    name: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
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
                        <Col className="mb-3">
                            <BootstrapForm.Label>Student Name</BootstrapForm.Label>
                            <Field type="text" name="name" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.name && !errors.name} />
                                )
                            }
                            />
                            {touched.name && !errors.name && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.name && errors.name && <BootstrapForm.Control.Feedback type="invalid">{errors.name}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                            <BootstrapForm.Label>Student Email</BootstrapForm.Label>
                            <Field type="text" name="email" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="email" isValid={touched.email && !errors.email} />
                                )
                            }
                            />
                            {touched.email && !errors.email && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.email && errors.email && <BootstrapForm.Control.Feedback type="invalid">{errors.email}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                            <BootstrapForm.Label>Student Password</BootstrapForm.Label>
                            <Field type="text" name="password" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="password" isValid={touched.password && !errors.password} />
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
            </Row>
        </Form>
    );
};

// The type of props StudentForm receives
interface StudentFormProps {
    initialValues?: IUser
    newStudent?: boolean;
    router: NextRouter
}

// Wrap our form with the withFormik HoC
const StudentForm = withFormik<StudentFormProps, FormValues>({

    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            email: props.initialValues ? props.initialValues.email : null || '',
            password: '',
            name: props.initialValues ? props.initialValues.name : null || '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.email) {
            errors.email = 'Student Email is required';
        }
        if (!values.password) {
            errors.password = 'Student Password is required';
        }
        if (!values.name) {
            errors.name = 'Student Name is required';
        }
        return errors;
    },

    handleSubmit: (values, formikBag) => {
        // do submitting things
        const { id } = formikBag.props.router.query
        const { setStatus, setSubmitting } = formikBag;

        const contentType = 'application/json'

        const putData = async (values: any) => {
            let hasErrors = false;
            // const { name, email } = values;
            // let modifiedValues = {
            //     name,
            //     email
            // }
            try {
                const res = await fetch(`/api/students/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: contentType,
                        'Content-Type': contentType,
                    },
                    body: JSON.stringify(values),
                })

                // Throw error with status code in case Fetch API req failed
                if (!res.ok) {
                    hasErrors = true;
                    setStatus({ message: 'Error occurred' });
                    setSubmitting(false);
                }

                const { data } = await res.json()

                mutate(`/api/students/${id}`, data, false) // Update the local data without a revalidation
            } catch (error) {
                hasErrors = true;
                setStatus({ message: 'Failed to update student' })
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/students')
            }
        }

        /* The POST method adds a new entry in the mongodb database. */
        const postData = async (values: any) => {
            let hasErrors = false;
            try {
                const data: IUser = {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    role: "STUDENT"
                }
                const res = await fetch('/api/users/register', {
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
                setStatus({ message: 'Failed to add student' });
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/students')
            }
        }

        formikBag.props.newStudent == true ? postData(values) : putData(values);
    },
})(InnerForm);

export default StudentForm;