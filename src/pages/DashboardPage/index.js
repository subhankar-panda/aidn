import React from 'react';
import {withFirebase} from '../../data/firebase';
import { Badge } from 'reactstrap';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      records: []
    }
  }

  async fetchDocs() {
    const records = await this.props.firebase.getRecordsById(localStorage.getItem('person'));
    this.setState({records: records.docs});
  }

  async componentDidMount() {
    await this.fetchDocs();
  }

  renderDocs() {
    const data = this.state.records.map(d => ({id: d.id, ...d.data()}))
    return (
      <div className="row mx-0 px-0">
        <div className="col">
          <h1 className="mb-3">Your Medical Records</h1>
          {data.map(d => (
            <div className="bg-white shadow w-100 br p-3">
              <h5>Document <b className="color-blue">{d.id}</b></h5>
              <div className="mt-1">
                <div>
                  {data.allergies && 
                    <><span className="color-yellow">Allergies:</span> {data.allergies}</>}
                </div>
                <div className="color-yellow mt-3">
                  Reported Conditions
                </div>
                <div>
                  {d.conditions && d.conditions.map(x => <Badge className="m-1 ">{x}</Badge>)}
                </div>
                <div className="color-yellow mt-3">
                  Message To Provider
                </div>
                <div>
                  {d.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderActivity() {
    return (
      <div className="row mx-0 px-0 pt-4">
        <div className="col">
        <h1 className="mb-3">Your <span className="color-blue">aidn</span> Activity</h1>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.user) return <div>go away :(</div>
    const {user} = this.props;
    return (
      <div className="w-100 h-100 container mt-5">
        <div className="row">
          <div className="col-md-5">
            <img src={user.picUrl} className="img-responsive w-100 br shadow p-0"></img>
            <h1 className="my-2">{user.name}</h1>
            <h5>{user.email}</h5>
          </div>
          <div className="col-md-6 offset-md-1">
            {this.renderDocs()}
            {this.renderActivity()}
          </div>
        </div>
      </div>
    )
  }
}

export default withFirebase(DashboardPage);