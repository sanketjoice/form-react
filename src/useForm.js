import { useState } from 'react';

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? (checked ? [...values[name], value] : values[name].filter(item => item !== value)) : value
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;