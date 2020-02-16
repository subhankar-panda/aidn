import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { throwStatement } from '@babel/types';
import { withFirebase } from '../../data/firebase';

class EntryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arthritis: false,
      cancer: false,
      diabetes: false,
      depression: false,
      epilepsyseizures: false,
      heartproblems: false,
      heartsurgery: false,
      highbp: false,
      psycdisease: false,
      stroke: false,
      thyroid: false,
    }
  }
 /*handleEmailChange: function(e) {
   this.setState({email: e.target.value});
},
handlePasswordChange = function(e) {
   this.setState({password: e.target.value});
}*/
  handleCheckbox = (label, e) => {
    this.setState({[label]: e.target.checked})
  }
  handleAllergies = (e) => {
    this.setState({allergies: e.target.value})
  }
  handleConditions = (e) => {
    this.setState({conditions: e.target.value})
  }
  handleMessage = (e) => {
    this.setState({message: e.target.value})
  }

  render() {
    console.log(this.state)
    return (
      <div className="w-75 mx-auto" style={{paddingBottom: "40px"}}>
        <Form>
        <h3 className="mt-4 mx-auto">medical history</h3>
        <h4 className="mt-4">please check all that apply to you:</h4>
          
          <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('arthritis', e)} value={this.state.arthritis}/>{' '}
              Arthritis
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('cancer', e)} value={this.state.cancer}/>{' '}
              Cancer
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('depression', e)} value={this.state.depression}/>{' '}
              Depression
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('diabetes', e)} value={this.state.diabetes}/>{' '}
              Diabetes
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('epilepsyseizures', e)} value={this.state.epilepsyseizures}/>{' '}
              Epilepsy/Seizures
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('heartproblems', e)} value={this.state.heartproblems}/>{' '}
              Heart Problems
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('heartsurgery', e)} value={this.state.heartsurgery}/>{' '}
              Heart Surgery
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('highbp', e)} value={this.state.highbp}/>{' '}
              High Blood Pressure
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('psycdisease', e)} value={this.state.psycdisease}/>{' '}
              Psychiatric Disease
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('stroke', e)} value={this.state.stroke}/>{' '}
              Stroke
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={(e) => this.handleCheckbox('thyroid', e)} value={this.state.thyroid}/>{' '}
              Thyroid
            </Label>
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">please enter any serious allergies, separated by commas and spaces (ex. "peanuts, ibuprofen"):</Label>
        <Input type="textarea" name="text" onChange={(e) => this.handleAllergies(e)} value={this.state.allergies} />
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">please enter any alternate conditions your aid network should be aware of:</Label>
        <Input type="textarea" name="text" onChange={(e) => this.handleConditions(e)} value={this.state.conditions} />
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">customize your emergency screen message:</Label>
        <Label for="exampleText">(ex. "I have had a heart transplant. Please do not administer a defibrillator.")</Label>
        <Input type="textarea" name="text" onChange={(e) => this.handleMessage(e)} value={this.state.message} />
        </FormGroup>
      
      <Button onClick={this.handleSubmit}>Submit</Button>
    </Form>
  
      </div>

    );
    
  }
  handleSubmit = async () => {
    let conditions = []
    const mapper = {
      'arthritis': 'Arthritis',
      'cancer': 'Cancer',
      'diabetes': 'Diabetes',
      'depression': 'Depression',
      'epilepsyseizures': 'Epilepsy',
      'heartproblems': 'Heart Problems',
      'heartsurgery': 'Heart Surgery',
      'highbp': 'High Blood Pressure',
      'psycdisease': 'Psychiatric Disease',
      'stroke': 'Stroke',
      'thyroid': 'Thyroid'
    }

    for (const k in mapper) {
      if (this.state[k] == true) {
        conditions.push(mapper[k])
      }
    }

    conditions.push(this.state.conditions)

    let data = {conditions, allergies: this.state.allergies, message: this.state.message, personId: this.props.user.personId};
    await this.props.firebase.sendMedicalInfo(data);
    console.log(conditions)
    window.location.href = window.location.origin + '/dashboard/'
  }
}

export default withFirebase(EntryPage);