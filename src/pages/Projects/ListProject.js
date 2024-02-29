import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';

const ListProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getToken()}`
          }
        });
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout title={'Our Projects'}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          {projects.map(project => (
            <div className="col-lg-6 mb-3" key={project.id_project}>
              <div className="card border-primary">
                <img className="card-img-top" src={`${process.env.REACT_APP_BE_URL}${project.image_path}`} alt={project.name} />
                <div className="card-body">
                  <h4 className="card-title">{project.name}</h4>
                  <p className="card-text">{project.description}</p>
                  <a href={project.external_url} className="btn btn-primary"><FontAwesomeIcon icon={faExternalLinkSquareAlt} /> Visit Project</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListProject;