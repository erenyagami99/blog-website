import React, { useState, useEffect } from "react";
import { currentUser } from "../services/userService";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userDetails = async () => {
      try {
        const user = await currentUser();
        setUser(user);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    userDetails();
  }, []);
  return (
    <>
      <div className="home-container">
        <img
          className="back-arrow"
          onClick={() => {
            navigate("/");
          }}
          src="/images/arrow.png"
          alt="back"
        />
        <div>
          {user.profilePicture ? (
            <img src={`/uploads/${user.profilePicture}`} alt="Selected" />
          ) : (
            <img src="/images/user.png" alt="/" />
          )}
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </div>
      </div>
      ;
    </>
  );
};

export default ProfilePage;
