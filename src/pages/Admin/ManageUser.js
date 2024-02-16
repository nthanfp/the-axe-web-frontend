import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Swal from 'sweetalert2';
import $ from 'jquery';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const ManageUser = () => {
  const [userList, setUserList] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

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

  useEffect(() => {
    fetchUserList();
    $('#userTable').DataTable();
  }, []);

  const getBadgeColor = (role) => {
    return role === 'ADMIN' ? 'bg-danger' : 'bg-primary';
  };

  const handleEdit = (uuid) => {
    const user = userList.find(user => user.uuid === uuid);
    setUserToEdit(user);
    setShowEditUserModal(true);
  };

  const handleDelete = (uuid) => {
    // Tampilkan pesan konfirmasi menggunakan SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/admin/users/${uuid}`, {
            headers: {
              Authorization: getToken(),
            },
          });
          // Jika pengguna berhasil dihapus, tampilkan pesan sukses
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );
          // Refresh daftar pengguna setelah pengguna dihapus
          fetchUserList();
        } catch (error) {
          console.error('Error deleting user:', error);
          // Jika gagal menghapus pengguna, tampilkan pesan error
          Swal.fire(
            'Error!',
            error.response.data.message || 'Something went wrong. Please try again later.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Jika pengguna membatalkan penghapusan, tampilkan pesan dibatalkan
        Swal.fire(
          'Cancelled',
          'User deletion was cancelled.',
          'info'
        );
      }
    });
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  return (
    <Layout title={`Manage Users`}>
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
                <button className="btn btn-sm btn-primary mb-3" onClick={handleAddUser}>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add User
                </button>
                <div className="table-responsive">
                  <table id='userTable' className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th className="text-nowrap text-center d-none">ID</th>
                        <th className="text-nowrap text-center">Email</th>
                        <th className="text-nowrap text-center">Phone</th>
                        <th className="text-nowrap text-center">Role</th>
                        <th className="text-nowrap text-center">Last Login</th>
                        <th className="text-nowrap text-center">Register At</th>
                        <th className="text-nowrap text-center">Actions</th>
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
                          <td className="text-nowrap">{moment(user.createdAt).format('DD-MM-YYYY hh:mm:ss')}</td>
                          <td className="text-nowrap text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => handleEdit(user.uuid)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(user.uuid)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
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
      <AddUserModal
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
        setUserList={setUserList}
        refreshUserList={fetchUserList}
      />
      <EditUserModal
        showEditUserModal={showEditUserModal}
        setShowEditUserModal={setShowEditUserModal}
        userToEdit={userToEdit}
        refreshUserList={fetchUserList}
      />
    </Layout>
  );
};

export default ManageUser;
