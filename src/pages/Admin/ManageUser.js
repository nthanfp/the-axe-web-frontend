import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';
import moment from 'moment';

const ManageUser = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
          headers: {
            Authorization: getToken(),
          },
        });
        setUserList(response.data.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUserList();
  }, []);

  const getBadgeColor = (role) => {
    return role === 'ADMIN' ? 'bg-danger' : 'bg-primary';
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Users
              </div>
              <div className="card-body">
                {/* User table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th className="text-nowrap text-center d-none">ID</th>
                        <th className="text-nowrap text-center">Email</th>
                        <th className="text-nowrap text-center">Phone</th>
                        <th className="text-nowrap text-center">Role</th>
                        <th className="text-nowrap text-center">Last Login</th>
                        <th className="text-nowrap text-center">Register At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map(user => (
                        <tr key={user.uuid}>
                          <td className="text-nowrap d-none">{user.uuid}</td>
                          <td className="text-nowrap">{user.email}</td>
                          <td className="text-nowrap">{user.phone}</td>
                          <td className="text-nowrap">
                            <span className={`badge ${getBadgeColor(user.role)}`}>{user.role}</span>
                          </td>
                          <td className="text-nowrap">{moment(user.last_login).format('DD-MM-YYYY hh:mm:ss')}</td>
                          <td className="text-nowrap">{moment(user.createdAt ).format('DD-MM-YYYY hh:mm:ss')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default ManageUser;