import React from 'react';
import { Formik, useFormik, Field } from 'formik';
import { Input, FormFeedback, Form, FormGroup, Label, Button } from "reactstrap";

import * as Yup from 'yup';

const customInputForm = ({field, form: {touched, errors}, ...props}) => (
  <div>
      <Input
          invalid={!!(touched[field.name] && errors[field.name])}
          {...field}
          {...props} />
      {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>
);

const LoginPage = () => {

  var validationSchema =  Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  })
  return (
    <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}>
              <div className="d-flex">
                <img src="../../aidnlogo.png" className="img-thumbnail w-25 text-center m-auto"></img>
                <Form className="w-50 mx-auto mt-5">
                    
                    <FormGroup>
                        <Label for="exampleEmail">email</Label>
                        <Field name="email" type={'email'} component={customInputForm}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">password</Label>
                        <Field name="password" type={'password'} component={customInputForm}/>
                    </FormGroup>
                    <Button color="info" >log in</Button>
                    <Button color="link" href="/signup/">sign up instead!</Button>
                </Form>
              </div>
            </Formik>
  );
};

export default LoginPage;