import React from 'react';
import './index.css'; // Import css modules stylesheet as styles

function App() {
  return (
    <div className='container h-100 d-flex'>
      <div className="row my-auto w-100">
        <div className="col-md-6">
          <img src='/aidnlogo.png' className="img-fluid"></img>
        </div>
        <div className="col-md-6 d-flex">
          <div className="my-auto text-center w-100 home-text">
            some catchy tagline here
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
