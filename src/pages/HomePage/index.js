import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import './index.css'; // Import css modules stylesheet as styles

function App() {
  return (
    <div className='home container-fluid h-100 d-flex'>
      <div className="row my-auto w-100">
        <div className="col-md-6 d-flex">
          <img src='/aidn2.png' className=" w-75 mx-auto img-fluid"></img>
        </div>
        <div className="col-md-6 d-flex">
          <div className="my-auto text-center w-100 home-text">
            aid network. built for you.
          </div>       
        </div>
      </div>
    </div>
  );
}

export default App;
