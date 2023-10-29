import React from "react";
import { deleteBlog } from "../../services/blogService";

const DeleteBlogPopup = (props) => {
  const { setModal, blog, user } = props;

  const deleteBlogFromApi = async () => {
    try {
      const id = blog._id;
      if (user._id === blog.postedBy) {
        await deleteBlog(id);
        setModal(false);
        window.location.reload();
      } else {
        console.log("You are not the author of the Blog");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-div">
        <p
          className="cancel-button"
          onClick={() => {
            setModal(false);
          }}
        >
          X
        </p>
        <h1>Are you sure, you want to delete this Blog?</h1>
        <div>
          <button
            className="logout-button"
            onClick={() => {
              deleteBlogFromApi();
            }}
          >
            Yes
          </button>
          <button
            className="logout-button"
            onClick={() => {
              setModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogPopup;
