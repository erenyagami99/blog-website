import React, { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService";
import { currentUser } from "../services/userService";
import { useNavigate } from "react-router";
import UpdateBlogPopup from "../components/popUps/updateBlogPopup";
import DeleteBlogPopup from "../components/popUps/deleteBlogPopup";
import moment from "moment";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [blog, setBlog] = useState();

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
          <h1
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user.name}
          </h1>
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
            navigate("/create-blog");
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
                <h1>Posted Date:</h1>
                <p>{moment(blog.updatedAt).format("DD-MM-YYYY")}</p>
              </div>
              <div>
                <button
                  className="delete-button"
                  onClick={() => {
                    setDeleteModal(true);
                    setBlog(blog);
                  }}
                >
                  DELETE
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    setUpdateModal(true);
                    setBlog(blog);
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {updateModal && (
        <UpdateBlogPopup setModal={setUpdateModal} blog={blog} user={user} />
      )}
      {deleteModal && (
        <DeleteBlogPopup setModal={setDeleteModal} blog={blog} user={user} />
      )}
    </>
  );
};

export default HomePage;
