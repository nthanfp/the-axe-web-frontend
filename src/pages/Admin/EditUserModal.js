import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../utils/Common';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
});

const EditUserModal = ({ showEditUserModal, setShowEditUserModal, userToEdit, refreshUserList }) => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        email: userToEdit.email || '',
        first_name: userToEdit.first_name || '',
        last_name: userToEdit.last_name || '',
        phone: userToEdit.phone || ''
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/users/${userToEdit.uuid}`, formData, {
        headers: {
          Authorization: getToken(),
        },
      });

      if (response.data && response.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated successfully!',
        });
      }

      setShowEditUserModal(false);
      refreshUserList();
      setErrors({});
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach(err => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      } else if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showEditUserModal && (
        <div>
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Edit User</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditUserModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="first_name" className="form-label">First Name</label>
                      <input type="text" className={`form-control ${errors.first_name && 'is-invalid'}`} name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" />
                      {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="last_name" className="form-label">Last Name</label>
                      <input type="text" className={`form-control ${errors.last_name && 'is-invalid'}`} name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" />
                      {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input type="text" className={`form-control ${errors.phone && 'is-invalid'}`} name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowEditUserModal(false)}>Close</button>
                      <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Save changes'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default EditUserModal;
