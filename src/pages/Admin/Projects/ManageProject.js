import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import { Layout } from '../../../components';
import { getToken } from '../../../utils/Common';
import AddProjectModal from './AddProjectModal';
import EditProjectModal from './EditProjectModal';

const ManageProject = () => {
  const [projectList, setProjectList] = useState([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const fetchProjectList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/projects`, {
        headers: {
          Authorization: getToken(),
        },
      });
      setProjectList(response.data.data);
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const handleEdit = (id) => {
    const project = projectList.find(project => project.id_project === id);
    setProjectToEdit(project);
    setShowEditProjectModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/admin/projects/${id}`, {
            headers: {
              Authorization: getToken(),
            },
          });
          Swal.fire(
            'Deleted!',
            'Project has been deleted.',
            'success'
          );
          fetchProjectList();
        } catch (error) {
          console.error('Error deleting project:', error);
          Swal.fire(
            'Error!',
            error.response.data.message || 'Something went wrong. Please try again later.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Project deletion was cancelled.',
          'info'
        );
      }
    });
  };

  const handleAddProject = () => {
    setShowAddProjectModal(true);
  };

  return (
    <Layout title={`Manage Projects`}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Projects
              </div>
              <div className="card-body">
                <button className="btn btn-sm btn-primary mb-3" onClick={handleAddProject}>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
                </button>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-nowrap text-center">Name</th>
                        <th className="text-nowrap text-center">Description</th>
                        <th className="text-nowrap text-center">External URL</th>
                        <th className="text-nowrap text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectList.map(project => (
                        <tr key={project.id_project}>
                          <td className="text-nowrap">{project.name}</td>
                          <td className="text-nowrap">{project.description}</td>
                          <td className="text-nowrap">{project.external_url}</td>
                          <td className="text-nowrap text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => handleEdit(project.id_project)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(project.id_project)}>
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
        </div>
      </div>
      <AddProjectModal
        showAddProjectModal={showAddProjectModal}
        setShowAddProjectModal={setShowAddProjectModal}
        setProjectList={setProjectList}
        fetchProjectList={fetchProjectList}
      />
      <EditProjectModal
        showEditProjectModal={showEditProjectModal}
        setShowEditProjectModal={setShowEditProjectModal}
        projectToEdit={projectToEdit}
        fetchProjectList={fetchProjectList}
      />
    </Layout>
  );
};

export default ManageProject;