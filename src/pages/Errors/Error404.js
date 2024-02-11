import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faHome } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components';

const Error404 = () => {

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <a href="https://theaxe.site" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHome} /> Take Me Home
              </a>
              <a href="https://theaxe.site/page/contact" className="btn btn-info btn-lg">
                <FontAwesomeIcon icon={faEnvelopeOpen} /> Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Error404;
