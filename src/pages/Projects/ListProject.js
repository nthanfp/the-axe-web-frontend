import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';

const ListProject = () => {
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
    <Layout title={'Our Projects'}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div class="row">
            <div class="col-lg-6 mb-3">
              <div class="card border-primary">
                <img class="card-img-top" src="https://res.cloudinary.com/ddw14mjcm/image/upload/v1600147890/20200915_123044_isu81p.jpg" alt="Twitter Auto Base"/>
                  <div class="card-body">
                    <h4 class="card-title">Twitter Auto Base</h4>
                    <p class="card-text">Twitter Auto Base it’s a console based script created for bot that works like others auto base account.</p>
                    <a href="https://github.com/nthanfp/TwitterAutoBase" class="btn btn-primary"><i class="fas fa-external-link-square-alt"></i> Visit Project</a>
                  </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="card border-primary">
                <img class="card-img-top" src="https://res.cloudinary.com/ddw14mjcm/image/upload/v1600147889/likegram_fvjomz.png" alt="Like Gram"/>
                  <div class="card-body">
                    <h4 class="card-title">Like Gram</h4>
                    <p class="card-text">Like Gram is an Auto Instagram followers website to increase your Instagram Indonesian Followers and Likes for free.</p>
                    <a href="https://github.com/nthanfp/TwitterAutoBase" class="btn btn-primary"><i class="fas fa-external-link-square-alt"></i> Visit Project</a>
                    <a href="<?=$config['host'];?>/page/contact" class="btn btn-success mx-2 float-right"><i class="fa fa-shopping-cart"></i> Buy This</a>
                  </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="card border-primary">
                <img class="card-img-top" src="https://res.cloudinary.com/ddw14mjcm/image/upload/v1600147890/igprice_aedadv.gif" alt="Insta Price"/>
                  <div class="card-body">
                    <h4 class="card-title">Insta Price</h4>
                    <p class="card-text">Insta Price allows you to calculate your estimated price your Instagram account based on your engagement and number of followers.</p>
                    <a href="https://igprice.me" class="btn btn-primary"><i class="fas fa-external-link-square-alt"></i> Visit Project</a>
                    <a href="<?=$config['host'];?>/page/contact" class="btn btn-success mx-2 float-right"><i class="fa fa-shopping-cart"></i> Buy This</a>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ListProject;
