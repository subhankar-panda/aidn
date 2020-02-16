import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import './index.css'; // Import css modules stylesheet as styles
import Nav from '../../components/Nav';
import {Link} from 'react-router-dom';

function App(props) {
  return (
    <div className='home container-fluid h-100 d-flex flex-column'>
      <Nav user={props.user} authenticated={props.authenticated} />
      <div className="row my-auto w-100 home__text">
        <div className="col-md-6 d-flex flex-column">
          <img src='/aidn2.png' className="mx-auto img-fluid" style={{width: '60%'}}></img>
          {props.authenticated && <Link to='/dashboard' className="text-center">
            <Button color='primary' size='lg' className="br text-large" >Go To Dashboard</Button>
          </Link>}
        </div>
        <div className="col-md-6 d-flex">
          <div className="w-100 home-text my-auto">
            {!props.authenticated && 'Wellness Tailored For You.'}
            {props.authenticated && 
              <div className="text-primary">
                Welcome back, <span className="name">{props.user.name}</span>
              </div>
            }

          </div>  
          <div className="yellow-bar"></div>   
          <div className="blue-bar"></div>  
        </div>
      </div>
    </div>
  );
}

export default App;
