// Import useEffect, useState, and useRef from React
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faKey, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components';
import { getToken } from '../../utils/Common';

const UpdateProfile = () => {
  // State variables
  const [user, setUser] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  // Ref for alert message
  const alertRef = useRef(null);

  // Initial form values and validation schema
  const initialValues = {
    first_name: '',
    last_name: '',
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Clear alert message before submission
        setAlertMessage(null);
        setAlertType(null);

        setIsLoading(true); // Set loading state to true during submission

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/account/profile`,
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        // Handle success
        setAlertMessage('Profile updated successfully');
        setAlertType('success');
      } catch (error) {
        // Handle error
        console.error('Error updating profile:', error);
        setAlertMessage('Error updating profile');
        setAlertType('danger');
      } finally {
        setIsLoading(false); // Set loading state back to false after submission
      }
    },
  });

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/account/profile`, {
          headers: {
            Authorization: getToken(),
          },
        });

        // Set initial form values with user profile data
        formik.setValues({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          phone: response.data.data.phone,
        });

        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Component rendering
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          {/* Update Profile Card */}
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUserEdit} className="mr-2" /> Update Profile
              </div>
              <div className="card-body">
                {/* Update Profile Form */}
                <form onSubmit={formik.handleSubmit}>
                  {/* First Name Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.first_name && formik.errors.first_name ? 'is-invalid' : ''}`}
                      id="first_name"
                      {...formik.getFieldProps('first_name')}
                      disabled={isLoading} // Disable input during loading
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <div className="invalid-feedback">{formik.errors.first_name}</div>
                    )}
                  </div>
                  {/* Last Name Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.last_name && formik.errors.last_name ? 'is-invalid' : ''}`}
                      id="last_name"
                      {...formik.getFieldProps('last_name')}
                      disabled={isLoading} // Disable input during loading
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <div className="invalid-feedback">{formik.errors.last_name}</div>
                    )}
                  </div>
                  {/* Phone Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      {...formik.getFieldProps('phone')}
                      disabled={isLoading} // Disable input during loading
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="invalid-feedback">{formik.errors.phone}</div>
                    )}
                  </div>
                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Update Profile'} {/* Change text based on loading state */}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Information Card */}
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Information
              </div>
              <div className="card-body">
                {/* Display alert message */}
                {alertMessage && (
                  <div ref={alertRef} className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
