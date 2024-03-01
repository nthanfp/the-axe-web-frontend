import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';

const Terms = () => {
  return (
    <Layout title={'Terms & Conditions'}>
      <div className="container mt-5">
        <div className="row">
          <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div class="col-md-12 mb-4">
            <div class="card border-primary">
              <div class="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Terms and Conditions of Use
              </div>
              <div class="card-body">
                <h4>1. Terms</h4>

                <p>By accessing this Website, accessible from https://theaxe.net, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

                <h4>2. Use License</h4>

                <p>Permission is granted to temporarily download one copy of the materials on {process.env.REACT_APP_NAME} Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

                <ul>
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose or for any public display;</li>
                  <li>attempt to reverse engineer any software contained on {process.env.REACT_APP_NAME} Website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                </ul>

                <p>This will let The Axe to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a> and the <a href="https://www.generateprivacypolicy.com">Privacy Policy Generator</a>.</p>

                <h4>3. Disclaimer</h4>

                <p>All the materials on {process.env.REACT_APP_NAME} Website are provided "as is". The Axe makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, The Axe does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

                <h4>4. Limitations</h4>

                <p>The Axe or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on {process.env.REACT_APP_NAME} Website, even if The Axe or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

                <h4>5. Revisions and Errata</h4>

                <p>The materials appearing on {process.env.REACT_APP_NAME} Website may include technical, typographical, or photographic errors. The Axe will not promise that any of the materials in this Website are accurate, complete, or current. The Axe may change the materials contained on its Website at any time without notice. The Axe does not make any commitment to update the materials.</p>

                <h4>6. Links</h4>

                <p>The Axe has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by The Axe of the site. The use of any linked website is at the user’s own risk.</p>

                <h4>7. Site Terms of Use Modifications</h4>

                <p>The Axe may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

                <h4>8. Your Privacy</h4>

                <p>Please read our Privacy Policy.</p>

                <h4>9. Governing Law</h4>

                <p>Any claim related to {process.env.REACT_APP_NAME} Website shall be governed by the laws of id without regards to its conflict of law provisions.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Terms;