import { useState } from 'react';

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  const validateField = (event) => {
    const { name, value } = event.target;
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value) error = 'Full Name is required.';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid.';
        }
        break;
      case 'phoneNumber':
        if (!value) {
          error = 'Phone Number is required.';
        } else if (!/^\d+$/.test(value)) {
          error = 'Phone Number is invalid.';
        }
        break;
      case 'position':
        if (!value) error = 'Position is required.';
        break;
      case 'experience':
        if (values.position === 'Developer' || values.position === 'Designer') {
          if (!value) {
            error = 'Relevant Experience is required.';
          } else if (value <= 0) {
            error = 'Experience must be greater than 0.';
          }
        }
        break;
      case 'portfolio':
        if (values.position === 'Designer') {
          if (!value) {
            error = 'Portfolio URL is required.';
          } else if (!/^https?:\/\/.\../i.test(value)) {
            error = 'Portfolio URL is invalid.';
          }
        }
        break;
      case 'managementExperience':
        if (values.position === 'Manager') {
          if (!value) error = 'Management Experience is required.';
        }
        break;
      case 'skills':
        if (values.skills.length === 0) error = 'At least one skill must be selected.';
        break;
      case 'interviewTime':
        if (!value) error = 'Preferred Interview Time is required.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const validateForm = () => {
    const validationErrors = {};

    for (const [name, value] of Object.entries(values)) {
      const error = validateField({ target: { name, value } });
      if (error) {
        validationErrors[name] = error;
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return {
    errors,
    validateField,
    validateForm,
  };
};

export default useValidation;