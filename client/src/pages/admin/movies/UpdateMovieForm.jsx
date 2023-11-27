// UpdateMovieForm.js
import React, { useState } from "react";
import "./updateform.css";
const UpdateMovieForm = ({ movie, onCancel, onUpdate }) => {
  const [updatedMovie, setUpdatedMovie] = useState({
    title: movie.title,
    _id: movie._id,
    certificate: movie.certificate,
    duration: movie.duration,
    release_date: movie.release_date,
    price: movie.price,
    description: movie.description,
    photos: movie.photos,
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
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedMovie.title}
          onChange={handleChange}
        />
        <label>Certificate:</label>
        <input
          type="text"
          name="certificate"
          value={updatedMovie.certificate}
          onChange={handleChange}
        />
        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={updatedMovie.duration}
          onChange={handleChange}
        />  
        <label>Release Date:</label>  
        <input  
          type="date"
          name="release_date"
          value={updatedMovie.release_date}
          onChange={handleChange}
        />
        <label>Price:</label>

        <input
          type="number"
          name="price"
          value={updatedMovie.price}
          onChange={handleChange}
        />  
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={updatedMovie.description}
          onChange={handleChange}
        />  
        <label>Photos:</label>  
        <input
          type="text"
          name="photos"
          value={updatedMovie.photos}
          onChange={handleChange}
        />
        {/* Add other fields as needed */}
        <button type="submit">Update</button>
      </form><br/>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateMovieForm;
