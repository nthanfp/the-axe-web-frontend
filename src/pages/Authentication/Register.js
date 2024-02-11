import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faPerson, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().matches(/^\d+$/, 'Invalid phone number').required('Phone is required'),
});

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        // Make a POST request to the registration endpoint
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          email: values.email,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone,
        });

        // Check if the registration was successful
        if (response.data.status === 'success') {
          console.log('Registration successful:', response.data);

          // Display success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            text: 'Redirecting to login...',
            showConfirmButton: false,
            timer: 3000, // Duration of the alert (in milliseconds)
          });

          // Redirect to login page after 3 seconds
          setTimeout(() => {
            navigate('/account/login'); // Replace '/account/login' with the actual login page route
          }, 3000);
        } else {
          // Registration failed, display error message
          console.error('Registration failed:', response.data.message);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: response.data.message,
          });
        }
      } catch (error) {
        // Handle unexpected errors during registration
        console.error('Registration failed:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: error.response && error.response.data.message ? error.response.data.message : 'An unexpected error occurred. Please try again.',
        });
      } finally {
        // Reset the submission state
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-6 mx-auto">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  {/* Email input */}
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
                        name="email"
                        placeholder="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isSubmitting}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      )}
                    </div>
                  </div>

                  {/* First Name input */}
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPerson} />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isSubmitting}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                      )}
                    </div>
                  </div>

                  {/* Last Name input */}
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPerson} />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isSubmitting}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  {/* Password input */}
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
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isSubmitting}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                      )}
                    </div>
                  </div>

                  {/* Phone input */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <input
                        type="tel"
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isSubmitting}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                      )}
                    </div>
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Register'}
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

export default RegisterPage;
