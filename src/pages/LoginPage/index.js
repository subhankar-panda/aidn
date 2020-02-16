import React from 'react';
import { Formik, useFormik, Field } from 'formik';
import { Input, FormFeedback, Form, FormGroup, Label, Button } from "reactstrap";
import {withRouter} from 'react-router'
import * as Yup from 'yup';
import { login } from '../../data';

const customInputForm = ({field, form: {touched, errors}, ...props}) => (
  <div>
      <Input
          invalid={!!(touched[field.name] && errors[field.name])}
          {...field}
          {...props} />
      {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>
);

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.schema = Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    })
  }

  onFinalSubmit = async (values) => {
    try {
      let res = await login(values.email, values.password)
      console.log(res)
      if (res.body.success) {
        localStorage.setItem('person', res.body.personId);
        window.location.replace('/')
      }
    } catch (e) {
      console.error(e)
    }
}

  render() {
    return (
      <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validationSchema={this.schema}
        onSubmit={this.onFinalSubmit}>
        {({handleSubmit}) => 
          (<Form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
            
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
        </Form>)}
    </Formik>
    ); 
  }
  
};

export default withRouter(LoginPage);