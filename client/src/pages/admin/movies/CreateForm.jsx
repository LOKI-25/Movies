// CreateForm.js
import React, { useState } from "react";
import "./createform.css";

const CreateForm = ({ onCreate, onCancel }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    certificate: "",
    duration: "",
    release_date: "",
    price: 0,
    description: "",
    photos: [],
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
      <h2>Create New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
          required
        />
        <label>Certificate:</label>
        <input
          type="text"
          name="certificate"
          value={newMovie.certificate}
          onChange={handleChange}
          required
        />
        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={newMovie.duration}
          onChange={handleChange}
          required
        />
        <label>Release Date:</label>
        <input
          type="date"
          name="release_date"
          value={newMovie.release_date}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newMovie.price}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newMovie.description}
          onChange={handleChange}
          required
        />
        <label>Photos:</label>
        <input
          type="text"
          name="photos"
          value={newMovie.photos}
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
