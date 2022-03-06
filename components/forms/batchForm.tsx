import { Field, FieldArray, FieldProps, Form, FormikErrors, FormikProps, withFormik } from 'formik';
import { Types } from 'mongoose';
import { NextRouter } from 'next/router';
import React from 'react';
import { Alert, Button, Col, Form as BootstrapForm, InputGroup, Row } from 'react-bootstrap';
import { FiTrash2 } from 'react-icons/fi';
import { mutate } from 'swr';
import IBatch from "../../interfaces/batch";

interface IAllStudentsProps {
    _id: string;
    name: string;
}
// Shape of form values
interface FormValues {
    batchCode: string;
    students: Array<Types.ObjectId>;
    allStudents: Array<IAllStudentsProps>;
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
                        <Col>
                            <BootstrapForm.Label>Batch Code</BootstrapForm.Label>
                            <Field type="text" name="batchCode" render={
                                ({ field, form: { isSubmitting } }: FieldProps) => (
                                    <BootstrapForm.Control {...field} disabled={isSubmitting} type="text" isValid={touched.batchCode && !errors.batchCode} />
                                )
                            }
                            />
                            {touched.batchCode && !errors.batchCode && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                            {touched.batchCode && errors.batchCode && <BootstrapForm.Control.Feedback type="invalid">{errors.batchCode}</BootstrapForm.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                            <BootstrapForm.Label>Students</BootstrapForm.Label>
                            <FieldArray
                                name="students"
                                render={arrayHelpers => (
                                    <div>
                                        {values.students && values.students.length > 0 ? (
                                            values.students.map((student, index) => (
                                                <div key={index}>
                                                    <Field type="text" name={`students.${index}`} render={
                                                        ({ field, form: { isSubmitting } }: FieldProps) => (
                                                            <InputGroup className="mb-3">
                                                                <BootstrapForm.Select
                                                                    {...field} disabled={isSubmitting} isValid={touched.students && !errors.students}
                                                                >
                                                                    {
                                                                        values.allStudents.map((s, idx) => (
                                                                            <option value={s._id}>{s.name}</option>
                                                                        ))
                                                                    }
                                                                </BootstrapForm.Select>
                                                                <Button variant="outline-secondary" id={`button-addon-question-code-${index}`} onClick={() => { arrayHelpers.remove(index) }}>
                                                                    <FiTrash2 />
                                                                </Button>
                                                            </InputGroup>
                                                        )
                                                    }
                                                    />
                                                    {touched.students && !errors.students && <BootstrapForm.Control.Feedback>Looks good!</BootstrapForm.Control.Feedback>}
                                                    {touched.students && errors.students && <BootstrapForm.Control.Feedback type="invalid">{errors.students}</BootstrapForm.Control.Feedback>}
                                                </div>
                                            ))
                                        ) : null}
                                        <Button variant='outline-secondary' onClick={() => arrayHelpers.push(values.allStudents[0]._id)} className='mt-2'>
                                            Add new Student
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
            </Row>
        </Form>
    );
};

// The type of props BatchForm receives
interface BatchFormProps {
    initialValues?: any;
    newBatch?: boolean;
    router: NextRouter
}

// Wrap our form with the withFormik HoC
const BatchForm = withFormik<BatchFormProps, FormValues>({

    enableReinitialize: true,

    // Transform outer props into form values
    mapPropsToValues: props => {
        console.log(props.initialValues ? props.initialValues.allStudents: null)
        return {
            batchCode: props.initialValues ? props.initialValues.batchCode : null || '',
            students: props.initialValues ? props.initialValues.students : null || [],
            allStudents: props.initialValues ? props.initialValues.allStudents : null || []
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.batchCode) {
            errors.batchCode = 'Batch Code is required';
        }
        return errors;
    },

    handleSubmit: (values, formikBag) => {
        // do submitting things
        const { id } = formikBag.props.router.query
        const { setStatus, setSubmitting } = formikBag;

        const contentType = 'application/json'

        const putData = async (values: FormValues) => {
            let hasErrors = false;
            // let modifiedValues = {
            //     batchCode: values.batchCode,
            //     students: values.students
            // }
            // console.log(values.students[0]);
            // console.log(Types.ObjectId.isValid(values.students[0]));
            // console.log("HIHI", typeof(values.students[0]));
            // for (let i = 0; i < modifiedValues.students.length; i++) {
            //     modifiedValues.students[i] = new Types.ObjectId(modifiedValues.students[i])
            //   }
            try {
                const res = await fetch(`/api/batches/${id}`, {
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

                mutate(`/api/batches/${id}`, data, false) // Update the local data without a revalidation
            } catch (error) {
                hasErrors = true;
                setStatus({ message: 'Failed to update batch' })
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/batches')
            }
        }

        /* The POST method adds a new entry in the mongodb database. */
        const postData = async (values: IBatch) => {
            let hasErrors = false;
            try {
                const res = await fetch('/api/batches', {
                    method: 'POST',
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
            } catch (error) {
                hasErrors = true;
                setStatus({ message: 'Failed to add batch' });
                setSubmitting(false);
            }
            if (hasErrors == false) {
                formikBag.props.router.push('/dashboard/batches')
            }
        }

        formikBag.props.newBatch == true ? postData(values) : putData(values);
    },
})(InnerForm);

export default BatchForm;