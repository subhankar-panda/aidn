import React from 'react';
import {withFirebase} from '../../data/firebase';
import { Badge } from 'reactstrap';
import './index.css'
class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      trials: []
    }
  }

  async fetchDocs() {
    const records = await this.props.firebase.getRecordsById(localStorage.getItem('person'));
    this.setState({records: records.docs});
  }

  async fetchTrials() {
    const trials = await this.props.firebase.getTrials()
    this.setState({trials: trials.docs.map(d => d.data())})
  }

  async componentDidMount() {
    await this.fetchDocs();
    await this.fetchTrials();
  }

  renderDocs() {
    const data = this.state.records.map(d => ({id: d.id, ...d.data()}))
    return (
      <div className="row mx-0 px-0">
        <div className="col">
          <h1 className="mb-3">Medical Records</h1>
          {data.map(d => (
<<<<<<< HEAD
            <div className="bg-white shadow w-100 br p-3 mb-3">
=======
            <div className="mb-5 bg-white shadow w-100 br p-3">
>>>>>>> c5ebe0916e1e28f0884db0ba2c7ad0fd47adc041
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
          <h1 className="mb-3"><span className="color-blue">aidn</span> Activity</h1>
          {this.state.trials.map((d, i) => (
            <div className="bg-white br shadow p-3 mb-3">
              <h5>Check-in <b className="color-blue">{i}</b></h5>
              {d.symptoms && (
                <>
                <div className="color-yellow mt-3">
                  Reported Symptoms
                </div>
                <div>
                  <Badge className="m-1 ">{d.symptoms}</Badge>
                </div>
                </>
              )}
              {d.tip && (
                <>
                <div className="color-yellow mt-3">
                  aidn's Feedback
                </div>
                <div>
                  {d.tip}
                </div>
                </>
              )}
                <div>
                  {!d.tip && !d.symptoms && 'No Actionable aidn Feedback'}
                </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.user) return <div className="w-100 h-100 d-flex"><div className="loader"></div></div>
    const {user} = this.props;
    return (
      <div className="w-100 h-100 container mt-5">
        <div className="row">
          <div className="col-md-5">
            <img src={user.picUrl} className="img-responsive w-100 br shadow p-0"></img>
            <h1 className="my-2">{user.name}</h1>
            <h5>{user.email}</h5>
            <div className="br bg-white shadow p-3 mt-3">
              <h5>Statistics</h5>
              <div className="row">
                <div className="col stat">
                  <div className="text-center emo">📝</div>
                  <div>
                    {this.state.records.length} Medical Report {this.state.records.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="col stat">
                <div className="text-center emo">📈</div>

                  {this.state.trials.length} Completed Checkins
                </div>
                <div className="col stat text-center">
                <div className="text-center emo">🔥</div>

                  Usage streak: 2 days
                </div>
              </div>
            </div>
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