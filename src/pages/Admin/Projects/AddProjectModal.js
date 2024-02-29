import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../utils/Common';

const AddProjectModal = ({ showAddProjectModal, setShowAddProjectModal, fetchProjectList }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    external_url: '',
    image: null // Untuk menyimpan berkas gambar yang diunggah
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] // Mengambil berkas gambar yang diunggah
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when submitting

    try {
      // FormData untuk mengirim data yang berisi berkas
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('external_url', formData.external_url);
      formDataToSend.append('image', formData.image); // Mengirim berkas gambar

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/projects`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Header untuk tipe konten berkas
          'Authorization': `Bearer ${getToken()}` // Menggunakan token dari getToken()
        },
      });

      console.log(response.data.message);

      // Tampilkan pesan sukses
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'New project added successfully!',
      });

      // Tutup modal
      setShowAddProjectModal(false);
      // Muat ulang daftar proyek
      fetchProjectList();
      // Reset formulir
      setFormData({
        name: '',
        description: '',
        external_url: '',
        image: null
      });
    } catch (error) {
      console.error('Error adding new project:', error);
      // Tampilkan pesan error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div>
      {showAddProjectModal && (
        <div>
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add Project</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddProjectModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control" name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="external_url" className="form-label">External URL</label>
                      <input type="text" className="form-control" name="external_url" id="external_url" value={formData.external_url} onChange={handleChange} placeholder="Enter external URL" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" id="image" onChange={handleFileChange} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddProjectModal(false)}>Close</button>
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

export default AddProjectModal;