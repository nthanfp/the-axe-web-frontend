import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils/Common';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  external_url: Yup.string().url('Invalid URL'),
});

const EditProjectModal = ({ showEditProjectModal, setShowEditProjectModal, projectToEdit, fetchProjectList }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    external_url: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        name: projectToEdit.name || '',
        description: projectToEdit.description || '',
        external_url: projectToEdit.external_url || '',
      });
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      const formDataForRequest = new FormData();
      formDataForRequest.append('name', formData.name);
      formDataForRequest.append('description', formData.description);
      formDataForRequest.append('external_url', formData.external_url);
      formDataForRequest.append('image', formData.image);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/projects/${projectToEdit.id_project}`, formDataForRequest, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
          text: 'Project updated successfully!',
        });
      }

      setShowEditProjectModal(false);
      fetchProjectList();
      setErrors({});
    } catch (error) {
      console.error('Error updating project:', error);
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
      {showEditProjectModal && (
        <div>
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Edit Project</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditProjectModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className={`form-control ${errors.description && 'is-invalid'}`} name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="external_url" className="form-label">External URL</label>
                      <input type="text" className={`form-control ${errors.external_url && 'is-invalid'}`} name="external_url" id="external_url" value={formData.external_url} onChange={handleChange} placeholder="Enter external URL" />
                      {errors.external_url && <div className="invalid-feedback">{errors.external_url}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" id="image" onChange={handleImageChange} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowEditProjectModal(false)}>Close</button>
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

export default EditProjectModal;