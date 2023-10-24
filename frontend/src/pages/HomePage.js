import React, { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService";
import { currentUser } from "../services/userService";
import CreatePortalPopup from "../components/popUps/createPortalPopup";
import UpdatePortalPopup from "../components/popUps/updatePortalPopup";
import DeletePortalPopup from "../components/popUps/deletePortalPopup";

const HomePage = () => {
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [portal, setPortal] = useState();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const getBlogsCall = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    const userDetails = async () => {
      try {
        const user = await currentUser();
        setUser(user);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    userDetails();
    getBlogsCall();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="header">
          <h1>{user.name}</h1>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <div
          className="create-blog"
          onClick={() => {
            setModal(true);
          }}
        >
          <img src="/images/add-icon.png" alt="/" />
          <h1>Create Blog</h1>
        </div>
        <div className="portals-container">
          {blogs.map((blog) => (
            <div className="portal-container">
              {console.log(blog, "blog")}
              <div>
                <h1>Tile :</h1>
                <p>{blog.heading}</p>
              </div>
              <div>
                <h1>Description:</h1>
                <p>{blog.description}</p>
              </div>
              <div>
                <h1>Author:</h1>
                <p>{blog.author.name}</p>
              </div>
              <div>
                <button
                  className="delete-button"
                  onClick={() => {
                    setDeleteModal(true);
                    setPortal(portal);
                  }}
                >
                  DELETE
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    setUpdateModal(true);
                    setPortal(portal);
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && <CreatePortalPopup setModal={setModal} />}
      {updateModal && (
        <UpdatePortalPopup setModal={setUpdateModal} portal={portal} />
      )}
      {deleteModal && (
        <DeletePortalPopup setModal={setDeleteModal} portal={portal} />
      )}
    </>
  );
};

export default HomePage;
