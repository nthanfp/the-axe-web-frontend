import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components';
import { removeUserSession } from '../../utils/Common';

const LogoutPage = () => {
  console.log('OK!');
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic
    removeUserSession();

    // Redirect to the home page after logout
    navigate('/');
  }, [navigate]);

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                Logout
              </div>
              <div className="card-body">
                <p>Logging out...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogoutPage;