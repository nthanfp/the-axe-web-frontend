import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components';
import { getToken } from '../../utils/Common';

const ProfilePage = () => {

  const [user, setUser] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyExist, setIsApiKeyExist] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/account/profile`, {
          headers: {
            Authorization: getToken(),
          },
        });
        setUser(response.data.data);
        setApiKey(response.data.data.api_key || 'No API Key Provided');
        setIsApiKeyExist(response.data.data.api_key === null ? false : true);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleApiKeyUpdate = async () => {
    // Add logic to update API key on the server
    // You can use axios.put or another appropriate method
    // For example:
    // const response = await axios.put(`${process.env.REACT_APP_API_URL}/account/update-api-key`, { apiKey }, {
    //   headers: {
    //     Authorization: getToken(),
    //   },
    // });
    // Handle response accordingly
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
              </div>
              <div className="card-body">
                <div className='table-responsive'>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th className='text-nowrap' scope="row">First Name</th>
                        <td className='text-nowrap'>{user.first_name}</td>
                      </tr>
                      <tr>
                        <th className='text-nowrap' scope="row">Last Name</th>
                        <td className='text-nowrap'>{user.last_name}</td>
                      </tr>
                      <tr>
                        <th className='text-nowrap' scope="row">Email Address</th>
                        <td className='text-nowrap'>{user.email}</td>
                      </tr>
                      <tr>
                        <th className='text-nowrap' scope="row">Phone</th>
                        <td className='text-nowrap'>{user.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faKey} className="mr-2" /> API Key
              </div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <label htmlFor="apiKey">API Key</label>
                  <input
                    type="text"
                    id="apiKey"
                    className="form-control"
                    value={apiKey}
                    disabled
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={isApiKeyExist ? handleApiKeyUpdate : null}
                  disabled={!isApiKeyExist} // Disable the button if apiKey does not exist
                >
                  {isApiKeyExist ? 'Update API Key' : 'Create API Key'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;