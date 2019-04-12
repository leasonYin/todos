import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { Form, Input, Label, FormGroup, Col, Row, Button, FormText } from 'reactstrap';

export default function UserForm() {
    return (
        <Formik
            initialValues={{ email: '', social: { facebook: '', twitter: '' } }}
            validate={values => {
                let errors = {};
                if(!values.email) {
                    errors.email = "Email is required";
                } else if(
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email format";
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
            }}
            render={
                ({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="mt-2">
                        <FormGroup row>
                            <Label for="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="span" className="text-danger" />
                            </Col>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="social.facebook">Facebook</Label>
                                    <Input type="text" id="social.facebook" value={values.social.facebook}
                                        onChange={handleChange} onBlur={handleBlur} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="social.twitter">Twitter</Label>
                                    <Input type="text" id="social.twitter" value={values.social.twitter}
                                        onChange={handleChange} onBlur={handleBlur} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Col>
                                <Button type="submit" disabled={isSubmitting}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                )
            }

        />
    )
}
