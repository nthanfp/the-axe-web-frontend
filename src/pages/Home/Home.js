import React, { useEffect } from 'react';

import { Layout } from '../../components';
// import '../../assets/js/siel.js'

const Home = () => {
  useEffect(() => {
    document.body.classList.add('body-img');
    return () => {
      document.body.classList.remove('body-img');
    };
  }, []);

  return (
    <Layout title={'Home'}>
      <div className="siel">
        <h1 className="lol">Hello</h1>
      </div>
    </Layout>
  );
};

export default Home;
