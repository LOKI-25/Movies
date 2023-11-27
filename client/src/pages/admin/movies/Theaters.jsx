// Movies.js
import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import useFetch from "../../../hooks/useFetch";
import CreateTheaterForm from "./CreateTheaterForm";
import UpdateThaterForm from "./UpdateTheaterForm";
import "./Movies.css"; // Import the stylesheet

const Theaters = () => {
  const fetchUrl = "/theatres";
  const { data, loading, error, reFetch } = useFetch(fetchUrl);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUpdate = (movie) => {
    setSelectedMovie(movie);
    setShowUpdateForm(true);
  };

  const handleUpdateCancel = () => {
    setSelectedMovie(null);
    setShowUpdateForm(false);
  };

  const handleCreate = async (newMovie) => {
    try {
      const response = await fetch("/theatres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        console.log("Movie created successfully!");
        setShowCreateForm(false);
        reFetch();
      } else {
        console.error("Failed to create movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleUpdateSubmit = async (updatedMovie) => {
    try {
      const response = await fetch(`theatres/${updatedMovie._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        console.log("Movie updated successfully!");
        reFetch();
        setSelectedMovie(null);
        setShowUpdateForm(false);
      } else {
        console.error("Failed to update movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`theatres/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
        setSelectedMovie(data.filter((user) => user._id !== userId));
        reFetch();
      } else {
        console.error(`Error deleting user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="movies-container">
        {" "}
        {/* Added a container class */}
        {loading ? (
          "Loading..."
        ) : (
          <div>
            create new Theater:{" "}
            <button onClick={() => setShowCreateForm(true)}>Create</button>
            <br />
            {Array.isArray(data) &&
              data.map((item) => (
                <div className="movie-item" key={item._id}>
                  <span className="movie-name">{item.name}</span>
                  <span className="movie-info">
                    {item.city} || {item.state} || {item.pincode}
                  </span>
                  <span className="movie-price">
                    Screens:{item.screens.length}
                  </span>

                  <div className="movie-buttons">
                    <button
                      className="movbtn"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className="movbtn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Update Form */}
      {showUpdateForm && selectedMovie && (
        <UpdateThaterForm
          movie={selectedMovie}
          onCancel={handleUpdateCancel}
          onUpdate={handleUpdateSubmit}
        />
      )}
      {showCreateForm && (
        <CreateTheaterForm
          onCreate={handleCreate}
          onCancel={handleCreateCancel}
        />
      )}
    </>
  );
};

export default Theaters;
