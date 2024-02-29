import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';

const ListTools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tools`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getToken()}`
          }
        });
        setTools(response.data.data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);

  return (
    <Layout title={'Tools'}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          {tools.map(tool => (
            <div key={tool.id_tools} className="col-md-6 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h4 className="card-title">{tool.name}</h4>
                  <p className="card-text">{tool.description}</p>
                  <a href={`/tools/${tool.slug}`}>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faExternalLinkSquareAlt} /> Visit Tools
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListTools;
