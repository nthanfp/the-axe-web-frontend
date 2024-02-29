import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils/Common';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  slug: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const AddToolModal = ({ showAddToolModal, setShowAddToolModal, fetchToolList }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
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

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/tools`, formData, {
        headers: {
          Authorization: getToken(),
        },
      });

      console.log(response.data.message);

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
          text: 'New tool added successfully!',
        });
      }

      // Close the modal
      setShowAddToolModal(false);
      // Refresh the tool list
      fetchToolList();
      // Reset the form fields
      setFormData({
        name: '',
        slug: '',
        description: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding new tool:', error);
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
      {showAddToolModal && (
        <div>
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add Tool</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddToolModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Slug</label>
                      <input type="text" className={`form-control ${errors.slug && 'is-invalid'}`} name="slug" id="slug" value={formData.slug} onChange={handleChange} placeholder="Enter slug" />
                      {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className={`form-control ${errors.description && 'is-invalid'}`} name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddToolModal(false)}>Close</button>
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

export default AddToolModal;
