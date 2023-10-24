import React from "react";
import { deleteBlog } from "../../services/blogService";

const DeletePortalPopup = (props) => {
  const { setModal, portal } = props;

  const deletePortalFromApi = async () => {
    try {
      const id = portal._id;
      await deleteBlog(id);
      setModal(false);
      window.location.reload();
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
        <h1>Are you sure, you want to delete this portal?</h1>
        <div>
          <button
            className="logout-button"
            onClick={() => {
              deletePortalFromApi();
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

export default DeletePortalPopup;
