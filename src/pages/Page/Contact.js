import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faEnvelopeOpenText, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div class="row mb-4">
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;