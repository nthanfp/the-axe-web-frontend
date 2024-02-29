import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils/Common';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  slug: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const EditToolModal = ({ showEditToolModal, setShowEditToolModal, toolToEdit, fetchToolList }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (toolToEdit) {
      setFormData({
        name: toolToEdit.name || '',
        slug: toolToEdit.slug || '',
        description: toolToEdit.description || ''
      });
    }
  }, [toolToEdit]);

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

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/tools/${toolToEdit.id_tools}`, formData, {
        headers: {
          Authorization: getToken(),
        },
      });

      console.log(response.data);

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
          text: 'Tool updated successfully!',
        });
      }

      setShowEditToolModal(false);
      fetchToolList();
      setErrors({});
    } catch (error) {
      console.error('Error updating tool:', error);
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
      {showEditToolModal && (
        <div>
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Edit Tool</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditToolModal(false)}></button>
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
                      <button type="button" className="btn btn-secondary" onClick={() => setShowEditToolModal(false)}>Close</button>
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

export default EditToolModal;
