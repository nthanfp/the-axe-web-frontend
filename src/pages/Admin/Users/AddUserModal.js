import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils/Common';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
});

const AddUserModal = ({ showAddUserModal, setShowAddUserModal, refreshUserList }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Set loading to true when submitting

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, formData, {
        headers: {
          Authorization: getToken(),
        },
      });

      // Check if there's a success message in the response body
      if (response.data && response.data.message) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      } else {
        // Show default success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'New user added successfully!',
        });
      }

      // Close the modal
      setShowAddUserModal(false);
      // Refresh the user list
      refreshUserList();
      // Reset the form fields
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding new user:', error);
      if (error instanceof Yup.ValidationError) {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach(err => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      } else if (error.response && error.response.data && error.response.data.message) {
        // Error message from the response body
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      } else {
        // Other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setLoading(false); // Set loading back to false after submission
    }
  };

  return (
    <div>
      {showAddUserModal && (
        <div>

          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add User</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddUserModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddUserModal(false)}>Close</button>
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

export default AddUserModal;
