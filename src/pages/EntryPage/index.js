import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EntryPage extends React.Component {

  render() {
    return (
      <div className="w-75 mx-auto">
        <Form>
          <h4 className="mt-4">past medical history: please check all that apply to you:</h4>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Arthritis
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Cancer
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Depression
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Diabetes
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Epilepsy/Seizures
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Heart Problems
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Heart Surgery
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              High Blood Pressure
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Psychiatric Disease
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Stroke
            </Label>
        </FormGroup>
        <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Thyroid
            </Label>
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">please enter any serious allergies, separated by commas and spaces (ex. "peanuts, ibuprofen"):</Label>
        <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">please enter any alternate conditions helpers should be aware of:</Label>
        <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>

        <FormGroup style={{marginTop: '15px'}}>
        <Label for="exampleText">in the event of an emergency, we will display this message on your screen:</Label>
        <Label for="exampleText">(ex. "I have had a heart transplant. Please do not administer a defibrillator.")</Label>
        <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
      
      <Button>Submit</Button>
    </Form>
      </div>
    );
  }
}

export default EntryPage;

{/*
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Example = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelectMulti">Select Multiple</Label>
        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Radio Buttons</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option one is this and that—be sure to include why it's great
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" />{' '}
            Option two can be something else and selecting it will deselect option one
          </Label>
        </FormGroup>
        <FormGroup check disabled>
          <Label check>
            <Input type="radio" name="radio1" disabled />{' '}
            Option three is disabled
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          Check me out
        </Label>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default Example; */}