import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';

const DashboardAdmin = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div className='col-md-12 mb-3'>
            <div className="row">
        
              <div className="col-xl-3 col-md-6 mb-2">
                <div className="card border border-primary">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-left">
                        <h3 className="mb-0">278</h3>
                        <span>Total User</span>
                      </div>
                      <div className="float-end">
                        <FontAwesomeIcon icon={faUser} className='bg-primary p-2 rounded-4 text-white' size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-2">
                <div className="card border border-primary">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-left">
                        <h3 className="mb-0">278</h3>
                        <span>Total User</span>
                      </div>
                      <div className="float-end">
                        <FontAwesomeIcon icon={faUser} className='bg-primary p-2 rounded-4 text-white' size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-2">
                <div className="card border border-primary">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-left">
                        <h3 className="mb-0">278</h3>
                        <span>Total User</span>
                      </div>
                      <div className="float-end">
                        <FontAwesomeIcon icon={faUser} className='bg-primary p-2 rounded-4 text-white' size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-2">
                <div className="card border border-primary">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-left">
                        <h3 className="mb-0">278</h3>
                        <span>Total User</span>
                      </div>
                      <div className="float-end">
                        <FontAwesomeIcon icon={faUser} className='bg-primary p-2 rounded-4 text-white' size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
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

export default DashboardAdmin;
