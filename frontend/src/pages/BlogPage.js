import React, { useState, useEffect } from "react";
import { currentUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";

const BlogPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

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

  const createBlogPost = async (e) => {
    const reqBody = {
      heading: heading,
      description: description,
      postedBy: user._id,
    };

    try {
      const response = await createBlog(reqBody);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
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
        <div className="blog-container">
          <div className="blog-div">
            <h1>Heading :</h1>
            <input
              className="title-input"
              type="text"
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="blog-div">
            <h1>Description :</h1>
            <textarea
              className="description-input"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={() => createBlogPost()} className="logout-button">
            Create
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default BlogPage;
