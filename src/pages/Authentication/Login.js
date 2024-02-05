import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components';
import { setUserSession } from '../../utils/Common';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        setErrorMessage('');
        setShowErrorAlert(false);
        setShowSuccessAlert(false);

        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: values.email,
          password: values.password,
        });

        console.log('Login successful:', response.data);
        setShowSuccessAlert(true);

        const { token } = response.data.data;
        setUserSession(token);
      } catch (error) {
        console.error('Login failed:', error.message);
        setShowErrorAlert(true);
        setErrorMessage(error.response && error.response.data.message ? error.response.data.message : 'An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </div>
              <div className="card-body">
                {/* Display success and error alerts */}
                {showSuccessAlert && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Login successful! Redirecting to home...
                  </div>
                )}
                {showErrorAlert && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Login failed: {errorMessage}
                  </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={formik.isSubmitting}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faKey} />
                      </span>
                      <input
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={formik.isSubmitting}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Loading...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;