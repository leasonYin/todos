import React from 'react';
import { Formik } from 'formik';
import { Form, Input, Label, FormGroup, Col, Row, Button } from 'reactstrap';

export default function UserForm() {
    return (
        <Formik
            initialValues={{ email: '', social: { facebook: '', twitter: '' } }}
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
                                <Input type="email" id="email" value={values.email}
                                    onChange={handleChange} onBlur={handleBlur} />
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
                                <Button type="submit">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                )
            }

        />
    )
}
