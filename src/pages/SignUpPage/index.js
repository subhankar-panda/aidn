import React from 'react';
import { Formik, useFormik, Field } from 'formik';
import { Input, FormFeedback, Form, FormGroup, Label, Button } from "reactstrap";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

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

function handleTakePhoto (dataUri) {
  // Do stuff with the photo...
  console.log(dataUri);
}

const SignUpPage = () => {

  var validationSchema =  Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
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
                    address: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}>
              <div className="d-flex flex-column">
                <img src="../../aidnlogo.png" className="img-thumbnail w-25 text-center m-auto"></img>
                <Form className="w-50 mx-auto mt-5">
                    <FormGroup>
                        <Label for="firstName">first name</Label>
                        <Field name="firstName" type={'text'} component={customInputForm}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">last name</Label>
                        <Field name="lastName" type={'text'} component={customInputForm}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">email</Label>
                        <Field name="email" type={'email'} component={customInputForm}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">password</Label>
                        <Field name="password" type={'password'} component={customInputForm}/>
                    </FormGroup>
                    {/*<Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } style={{width: '500px', margin: 'auto'}} />
*/}
                    <Button color="info" >sign up</Button>

                    <Button color="link" href="/login/">log in instead!</Button>

                </Form>
              </div>
            </Formik>
  );
};

export default SignUpPage;