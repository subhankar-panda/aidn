import React from 'react';
import { Formik, Field } from 'formik';
import { Input, FormFeedback, Form, FormGroup, Label, Button } from "reactstrap";
import FileUpload from './FileUpload.js';
import {signUp} from '../../data/index';
import {withFirebase} from '../../data/firebase';
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.schema =  Yup.object({
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
      firstNameContact: Yup.string()
        .max(15, 'Must be 15 characters or less'),
      lastNameContact: Yup.string()
        .max(15, 'Must be 15 characters or less'),
      contactEmail: Yup.string()
        .email('Invalid email address'),
      phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    })
  }

  signupUser = async (values) => {
    console.log(values);
    const res = await signUp(values);
    localStorage.setItem('person', res.body.personId)
  }
  render() {
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={this.schema}
        onSubmit={async (values) => {
          await this.signupUser(values)
        }}>
          {({handleSubmit}) => (
            // <div className="d-flex">
            // <img src="../../aidn2.png" className="img-thumbnail w-25 text-center m-auto"></img> 
            <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
                <h2>your information:</h2>
                <FormGroup>
                    <Label for="firstName">first name</Label>
                    <Field name="firstName" type={'text'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">last name</Label>
                    <Field name="lastName" type={'text'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">email</Label>
                    <Field name="email" type={'email'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">password</Label>
                    <Field name="password" type={'password'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="profilePhoto">upload profile photo</Label>
                  <Field
                    style={{margin: 'auto'}}
                    name="image"
                    component={FileUpload}
                  />
                </FormGroup>
                <h2>emergency contact information:</h2>
                <h8>this person will be contacted in the event of an emergency</h8>
                <FormGroup>
                  <Label for="contact1">first name</Label>
                  <Field name="firstNameContact" type="firstNameContact" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">last name</Label>
                  <Field name="lastNameContact" type="lastNameContact" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">phone number</Label>
                  <Field name="phoneNumber" type="phoneNumber" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">email</Label>
                  <Field name="contactEmail" type="contactEmail" component={customInputForm}/>
                </FormGroup>
                <Button color="info" type="submit">sign up</Button>

                <Button color="link" href="/login/">log in instead!</Button>
            </form>)}
          {/* </div>)} */}
        </Formik>
      );
  }
};

export default SignUpPage;