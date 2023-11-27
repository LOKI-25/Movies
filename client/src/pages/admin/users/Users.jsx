import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";

const Users = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("customers/");
        const newData = await response.json();
        setData(newData);

        const initialUpdateData = {};
        newData.forEach((user) => {
          initialUpdateData[user._id] = {};
        });
        setUpdateData(initialUpdateData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`customers/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
        setData(data.filter((user) => user._id !== userId));
      } else {
        console.error(`Error deleting user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (userId) => {
    try {
      const response = await fetch(`customers/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData[userId]),
      });

      if (response.ok) {
        console.log(`User with ID ${userId} updated successfully`);
        setUpdateData({
          ...updateData,
          [userId]: {},
        });
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId ? { ...user, ...updateData[userId] } : user
          )
        );
      } else {
        console.error(`Error updating user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2>Users</h2>
        <div className="listResult">
          {data?.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <h4>{item["email"]}</h4>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="New Email"
                  value={updateData[item._id]?.email || ""}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      [item._id]: {
                        ...updateData[item._id],
                        email: e.target.value,
                      },
                    })
                  }
                  style={{ marginRight: "10px" }}
                />
                <input
                  type="text"
                  placeholder="New Phone"
                  value={updateData[item._id]?.phone || ""}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      [item._id]: {
                        ...updateData[item._id],
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <button
                onClick={() => handleUpdate(item._id)}
                style={{
                  padding: "8px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  padding: "8px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
