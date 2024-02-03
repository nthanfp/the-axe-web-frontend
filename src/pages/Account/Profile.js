import React from 'react';
import { Layout } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  // Replace the dummy user data with the actual user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
              </div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">First Name</th>
                      <td>{user.firstName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last Name</th>
                      <td>{user.lastName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email Address</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td>{user.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;