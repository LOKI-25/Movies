// CreateForm.js
import React, { useState } from "react";
import "./createform.css";

const CreateForm = ({ onCreate, onCancel }) => {
  const [newMovie, setNewMovie] = useState({
    name: "",
    city: "",
    state: "",
    zipcode: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onCreate function with the new movie data
    onCreate(newMovie);
  };

  return (
    <div className="createForm">
      <h2>Create New Theatre</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          required
        />
        <label>City:</label>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          required
        />
        <label>State:</label>
        <input
          type="text"
          name="state"
          onChange={handleChange}
          required
        />
        <label>Zipcode:</label>
        <input
          type="text"
          name="zipcode"
          onChange={handleChange}
          required
        />

        {/* Add other fields as needed */}
        <button type="submit">Create</button>
        <br />
        <button onClick={onCancel}>Cancel</button>
      </form>
      <br />
    </div>
  );
};

export default CreateForm;
