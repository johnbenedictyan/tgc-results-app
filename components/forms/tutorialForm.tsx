import { Field, FieldArray, FieldProps, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { NextRouter } from 'next/router';
import React from 'react';
import { Alert, Button, Col, Form as BootstrapForm, InputGroup, Row } from 'react-bootstrap';
import { FiTrash2 } from 'react-icons/fi';
import { mutate } from 'swr';
import ITutorial from "../../interfaces/tutorial";

// Shape of form values
interface FormValues {
    group: string;
    title: string;
    order: number;
    tutorialCode: string;
    questionCodes: Array<string>;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, status, values } = props;
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
                            <BootstrapForm.Label>Tutorial Group</BootstrapForm.Label>
                            <Field type="text" name="group" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.group && !errors.group} />
                                )
                            }
                            />
                            {touched.group && !errors.group && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.group && errors.group && <BootstrapForm.Control.Feedback type="invalid">{errors.group}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Tutorial Title</BootstrapForm.Label>
                            <Field type="text" name="title" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.title && !errors.title} />
                                )
                            }
                            />
                            {touched.title && !errors.title && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.title && errors.title && <BootstrapForm.Control.Feedback type="invalid">{errors.title}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Tutorial Code</BootstrapForm.Label>
                            <Field type="text" name="tutorialCode" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.tutorialCode && !errors.tutorialCode} />
                                )
                            }
                            />
                            {touched.tutorialCode && !errors.tutorialCode && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.tutorialCode && errors.tutorialCode && <BootstrapForm.Control.Feedback type="invalid">{errors.tutorialCode}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Tutorial Question Codes</BootstrapForm.Label>
                            <FieldArray
                                name="questionCodes"
                                render={arrayHelpers => (
                                    <div>
                                        {values.questionCodes && values.questionCodes.length > 0 ? (
                                            values.questionCodes.map((_questionCode, index) => (
                                                <div key={index}>
                                                    <Field type="text" name={`questionCodes.${index}`} render={
                                                        ({ field, form: { isSubmitting } }: FieldProps) => (
                                                            <InputGroup className="mb-3">
                                                                <BootstrapForm.Control
                                                                    {...field} disabled={isSubmitting} type="text" isValid={touched.questionCodes && !errors.questionCodes}
                                                                />
                                                                <Button variant="outline-secondary" id={`button-addon-question-code-${index}`} onClick={() => { arrayHelpers.remove(index) }}>
                                                                    <FiTrash2 />
                                                                </Button>
                                                            </InputGroup>

                                                        )
                                                    }
                                                    />
                                                    {touched.questionCodes && !errors.questionCodes && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                                                    {touched.questionCodes && errors.questionCodes && <BootstrapForm.Control.Feedback type="invalid">{errors.questionCodes}</BootstrapForm.Control.Feedback>}
                                                </div>
                                            ))
                                        ) : null}
                                        <Button variant='outline-secondary' onClick={() => arrayHelpers.push('')} className='mt-2'>
                                            Add new Question Code
                                        </Button>
                                    </div>
                                )}
                            />
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

// The type of props TutorialForm receives
interface TutorialFormProps {
    initialValues?: FormValues;
    newTutorial?: boolean;
    router: NextRouter
}

// Wrap our form with the withFormik HoC
const TutorialForm = withFormik<TutorialFormProps, FormValues>({

    // Transform outer props into form values
    mapPropsToValues: props => {

        return {
            group: props.initialValues ?
                props.initialValues.group
                : null || '',
            title: props.initialValues ?
                props.initialValues.title
                : null || '',
            order: props.initialValues ?
                props.initialValues.order
                : null || 1,
            tutorialCode: props.initialValues ?
                props.initialValues.tutorialCode
                : null || '',
            questionCodes: props.initialValues ?
                props.initialValues.questionCodes
                : null || []
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.group) {
            errors.group = 'Tutorial Group is required';
        }
        if (!values.title) {
            errors.title = 'Tutorial Title is required';
        }
        if (!values.tutorialCode) {
            errors.tutorialCode = 'Tutorial Code is required';
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
            try {
                const res = await fetch(`/api/tutorials/${id}`, {
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

                mutate(`/api/tutorials/${id}`, data, false) // Update the local data without a revalidation
            } catch (error) {
                hasErrors = true;
                setStatus({ message: 'Failed to update tutorial' })
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/tutorials')
            }
        }

        /* The POST method adds a new entry in the mongodb database. */
        const postData = async (values: any) => {
            let hasErrors = false;
            try {
                // TODO: Change the order code from a constant 1 to a dynamic number
                const data: ITutorial = {
                    group: values.group,
                    title: values.title,
                    order: 1,
                    tutorialCode: values.tutorialCode,
                    questionCodes: values.questionCodes
                }
                const res = await fetch('/api/tutorials', {
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
                setStatus({ message: 'Failed to add tutorial' });
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/tutorials')
            }
        }

        formikBag.props.newTutorial == true
            ? postData(values)
            : putData(values);
    },
})(InnerForm);

export default TutorialForm;