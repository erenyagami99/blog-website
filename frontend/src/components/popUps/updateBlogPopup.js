import React, { useState, useEffect } from "react";
import { updateBlog } from "../../services/blogService";

const UpdateBlogPopup = (props) => {
  const { setModal, blog, user } = props;
  console.log(user, "gonow");

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [isBtnActive, setIsBtnActive] = useState(false);

  const updateBlogCall = async (e) => {
    const id = blog._id;
    const reqBody = {
      heading: heading,
      description: description,
      postedBy: user._id,
    };
    await updateBlog(reqBody, id);
    setModal(false);
    window.location.reload();
  };

  useEffect(() => {
    if (heading.length > 0 && description.length > 0) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [heading, description]);
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
        <div className="input-container">
          <div className="input-div">
            <p>Title :</p>
            <input
              className="title-input"
              defaultValue={blog.heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="input-div">
            <p>Description :</p>
            <textarea
              className="description-input"
              defaultValue={blog.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => (isBtnActive ? updateBlogCall() : "")}
          className={isBtnActive ? "filled" : ""}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateBlogPopup;
