import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faKey } from '@fortawesome/free-solid-svg-icons';

import { Layout, SelectBar } from '../../components';
import { getToken } from '../../utils/Common';

const ChangePassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('Current Password is required'),
    new_password: Yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      setAlertMessage(null);
      setAlertType(null);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/account/change-password`,
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setAlertMessage('Password changed successfully');
        setAlertType('success');
        formik.resetForm();
      } catch (error) {
        console.error('Error changing password:', error);
        setAlertMessage(`Error changing password`);
        setAlertType('danger');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
        <div className='col-md-12 mb-3'>
            <SelectBar />
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faKey} className="mr-2" /> Change Password
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="current_password">Current Password</label>
                    <input
                      type="password"
                      id="current_password"
                      name="current_password"
                      className={`form-control ${formik.touched.current_password && formik.errors.current_password ? 'is-invalid' : ''}`}
                      {...formik.getFieldProps('current_password')}
                      disabled={submitting}
                    />
                    {formik.touched.current_password && formik.errors.current_password && (
                      <div className="invalid-feedback">{formik.errors.current_password}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="new_password">New Password</label>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      className={`form-control ${formik.touched.new_password && formik.errors.new_password ? 'is-invalid' : ''}`}
                      {...formik.getFieldProps('new_password')}
                      disabled={submitting}
                    />
                    {formik.touched.new_password && formik.errors.new_password && (
                      <div className="invalid-feedback">{formik.errors.new_password}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className={`form-control ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`}
                      {...formik.getFieldProps('confirm_password')}
                      disabled={submitting}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && (
                      <div className="invalid-feedback">{formik.errors.confirm_password}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Loading...' : 'Change Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Information
              </div>
              <div className="card-body">
                {alertMessage && (
                  <div className={`alert alert-${alertType}`} role="alert">
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

export default ChangePassword;
