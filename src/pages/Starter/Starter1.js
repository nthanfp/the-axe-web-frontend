import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';

const StarterPage1 = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Box 1
              </div>
              <div className="card-body">
                
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faKey} className="mr-2" /> Box 2
              </div>
              <div className="card-body">

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StarterPage1;
