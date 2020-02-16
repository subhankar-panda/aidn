import React from 'react';
import { Formik, Field } from 'formik';
import { Toast, ToastBody, ToastHeader, Input, FormFeedback, Form, FormGroup, Label, Button } from "reactstrap";
import FileUpload from './FileUpload.js';
import {signUp} from '../../data/index';
import {withFirebase} from '../../data/firebase';
import './index.css';
import * as Yup from 'yup';
import Cam from './Cam.js';

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
    this.state = {
      success: false,
    }
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

    this.state = {
      cameraCollapsed: true
    }
<<<<<<< HEAD
=======

>>>>>>> cf5efc9eee7a5808938869f6839ad7eb9ba1e615
  }

  signupUser = async (values) => {
    console.log(values);
    const res = await signUp(values);
    localStorage.setItem('person', res.body.personId)
  }

<<<<<<< HEAD
=======

>>>>>>> cf5efc9eee7a5808938869f6839ad7eb9ba1e615
  render() {
    return (
      <div className='container-fluid h-100 d-flex'>
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
                <h2>Your Information:</h2>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Field name="firstName" type={'text'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Field name="lastName" type={'text'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Field name="email" type={'email'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Field name="password" type={'password'} component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="profilePhoto">Upload Profile Photo</Label>
                  <Field
                    style={{margin: 'auto'}}
                    name="image"
                    component={FileUpload}
                  />
                  <h3 className="text-center">
                    or
                    <div className="mt-3">{this.state.cameraCollapsed && <Button color='primary' onClick={() => this.setState({cameraCollapsed: false})}>Take a Photo</Button>}</div>
                  </h3>
                  {!this.state.cameraCollapsed &&  <Field name="image" component={Cam} />}
                </FormGroup>
                <h2>Emergency Contact Information:</h2>
                <h8>This person will be contacted in the event of an emergency</h8>
                <FormGroup>
                  <Label for="contact1">First Name</Label>
                  <Field name="firstNameContact" type="firstName" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">Last Name</Label>
                  <Field name="lastNameContact" type="lastName" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">Phone Number</Label>
                  <Field name="phoneNumber" type="phoneNumber" component={customInputForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for="contact1">Email</Label>
                  <Field name="contactEmail" type="contactEmail" component={customInputForm}/>
                </FormGroup>
<<<<<<< HEAD
                <Button color="info" type="submit">Sign Up</Button>
                <Button color="link" href="/login/">Log In Instead!</Button>
=======
                <Button color="info" onClick={() => this.setState({success: true})} type="submit">Sign Up</Button>
                <Button color="link" href="/login/">Log In Instead!</Button>

                {this.state.success && 
                <div className="p-3 my-2 rounded">
                  <Toast>
                    <ToastHeader>
                      Registration Success!
                    </ToastHeader>
                    <ToastBody>
                      Navigate to another tab to explore your newly enabled aidn account!
                    </ToastBody>
                  </Toast>
                </div>}
>>>>>>> cf5efc9eee7a5808938869f6839ad7eb9ba1e615
            </form>)}
        </Formik>
      </div>
      );
  }
};

export default SignUpPage;