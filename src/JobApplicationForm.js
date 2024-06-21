import React from 'react';
import useForm from './useForm';
import useValidation from './useValidation';

const JobApplicationForm = () => {
  const { values, handleChange, handleSubmit, resetForm } = useForm(handleFormSubmit, {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    portfolio: '',
    managementExperience: '',
    skills: [],
    interviewTime: '',
  });

  const { errors, validateForm, validateField } = useValidation(values);

  function handleFormSubmit() {
    if (validateForm()) {
      alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
      resetForm();
    }
  }

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={validateField}
          className="mt-1 block w-full"/>
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={validateField}
          className="mt-1 block w-full"/>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={validateField}
          className="mt-1 block w-full"/>
        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Applying for Position</label>
        <select
          name="position"
          value={values.position}
          onChange={handleChange}
          onBlur={validateField}
          className="mt-1 block w-full">
          <option value="">Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
      </div>

      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div className="mb-4">
          <label className="block text-gray-700">Relevant Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={values.experience}
            onChange={handleChange}
            onBlur={validateField}
            className="mt-1 block w-full"/>
          {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
        </div>
      )}

      {values.position === 'Designer' && (
        <div className="mb-4">
          <label className="block text-gray-700">Portfolio URL</label>
          <input
            type="url"
            name="portfolio"
            value={values.portfolio}
            onChange={handleChange}
            onBlur={validateField}
            className="mt-1 block w-full"/>
          {errors.portfolio && <p className="text-red-500 text-xs">{errors.portfolio}</p>}
        </div>
      )}

      {values.position === 'Manager' && (
        <div className="mb-4">
          <label className="block text-gray-700">Management Experience</label>
          <textarea
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
            onBlur={validateField}
            className="mt-1 block w-full"></textarea>
          {errors.managementExperience && <p className="text-red-500 text-xs">{errors.managementExperience}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Additional Skills</label>
        <div className="mt-2">
          {['JavaScript', 'CSS', 'Python'].map((skill) => (
            <label key={skill} className="block">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={values.skills.includes(skill)}
                onChange={handleChange}
                className="mr-2"/>
              {skill}
            </label>
          ))}
        </div>
        {errors.skills && <p className="text-red-500 text-xs">{errors.skills}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="interviewTime"
          value={values.interviewTime}
          onChange={handleChange}
          onBlur={validateField}
          className="mt-1 block w-full"/>
        {errors.interviewTime && <p className="text-red-500 text-xs">{errors.interviewTime}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default JobApplicationForm;