// UpdateMovieForm.js
import React, { useState } from "react";
import "./updateform.css";
const UpdateMovieForm = ({ movie, onCancel, onUpdate }) => {
  const [updatedMovie, setUpdatedMovie] = useState({
    name: movie.name,
    _id: movie._id,
    city: movie.city,
    state: movie.state,
    zipcode: movie.zipcode,

    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdate function with the updatedMovie data
    onUpdate(updatedMovie);
  };

  return (
    <div className="updateForm">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>

        <input
          type="text"
          name="name"
          value={updatedMovie.name}
          onChange={handleChange}
        />
        <label>City:</label>

        <input
          type="text"
          name="city"
          value={updatedMovie.city}
          onChange={handleChange}
        />
        <label>State:</label>

        <input
          type="text"
          name="state"
          value={updatedMovie.state}
          onChange={handleChange}
        />
        <label>Zipcode:</label>

        <input
          type="text"
          name="zipcode"
          value={updatedMovie.zipcode}
          onChange={handleChange}
        />

        {/* Add other fields as needed */}
        <button type="submit">Update</button>
      </form>
      <br />
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateMovieForm;
