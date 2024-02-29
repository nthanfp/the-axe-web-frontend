import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Swal from 'sweetalert2';

import { Layout, SelectBar } from '../../../components';
import { getToken } from '../../../utils/Common';
import AddToolModal from './AddToolModal';
import EditToolModal from './EditToolModal';

const ManageTool = () => {
  const [toolList, setToolList] = useState([]);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [showEditToolModal, setShowEditToolModal] = useState(false);
  const [toolToEdit, setToolToEdit] = useState(null);

  const fetchToolList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/tools`, {
        headers: {
          Authorization: getToken(),
        },
      });
      setToolList(response.data.data);
    } catch (error) {
      console.error('Error fetching tool list:', error);
    }
  };

  useEffect(() => {
    fetchToolList();
  }, []);

  const handleEdit = (id) => {
    const tool = toolList.find(tool => tool.id_tools === id);
    setToolToEdit(tool);
    setShowEditToolModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tool!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/admin/tools/${id}`, {
            headers: {
              Authorization: getToken(),
            },
          });
          Swal.fire(
            'Deleted!',
            'Tool has been deleted.',
            'success'
          );
          fetchToolList();
        } catch (error) {
          console.error('Error deleting tool:', error);
          Swal.fire(
            'Error!',
            error.response.data.message || 'Something went wrong. Please try again later.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Tool deletion was cancelled.',
          'info'
        );
      }
    });
  };

  const handleAddTool = () => {
    setShowAddToolModal(true);
  };

  return (
    <Layout title={`Manage Tools`}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Tools
              </div>
              <div className="card-body">
                <button className="btn btn-sm btn-primary mb-3" onClick={handleAddTool}>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Tool
                </button>
                <div className="table-responsive">
                  <table id='toolTable' className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-nowrap text-center">Name</th>
                        <th className="text-nowrap text-center">Slug</th>
                        <th className="text-nowrap text-center">Description</th>
                        <th className="text-nowrap text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toolList.map(tool => (
                        <tr key={tool.id_tools}>
                          <td className="text-nowrap">{tool.name}</td>
                          <td className="text-nowrap">{tool.slug}</td>
                          <td className="text-nowrap">{tool.description}</td>
                          <td className="text-nowrap text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => handleEdit(tool.id_tools)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(tool.id_tools)}>
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
      <AddToolModal
        showAddToolModal={showAddToolModal}
        setShowAddToolModal={setShowAddToolModal}
        setToolList={setToolList}
        fetchToolList={fetchToolList}
      />
      <EditToolModal
        showEditToolModal={showEditToolModal}
        setShowEditToolModal={setShowEditToolModal}
        toolToEdit={toolToEdit}
        fetchToolList={fetchToolList}
      />
    </Layout>
  );
};

export default ManageTool;
