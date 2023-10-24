import React, { useState, useEffect } from "react";
import { updateBlog } from "../../services/blogService";

const UpdatePortalPopup = (props) => {
  const { setModal, portal } = props;

  const [token, setToken] = useState({
    projectId: portal.projectId,
    appCode: portal.appCode,
    modelId: portal.modelId,
    version: portal.version,
    title: portal.title,
    description: portal.description,
    isBtnActive: false,
    _id: portal._id,
  });

  const updatePortal = async (e) => {
    const id = token._id;
    const reqBody = {
      appCode: token.appCode,
      projectId: token.projectId,
      modelId: token.modelId,
      version: token.version,
      title: token.title,
      description: token.description,
    };
    await updateBlog(reqBody, id);
    setModal(false);
    window.location.reload();
  };

  useEffect(() => {
    if (
      token.appCode.length > 0 &&
      token.projectId.length > 0 &&
      token.modelId.length > 0 &&
      token.version.length > 0 &&
      token.title.length > 0 &&
      token.description.length > 0
    ) {
      setToken((pre) => ({
        ...pre,
        isBtnActive: true,
      }));
    } else {
      setToken((pre) => ({
        ...pre,
        isBtnActive: false,
      }));
    }
  }, [
    token.appCode,
    token.projectId,
    token.modelId,
    token.version,
    token.title,
    token.description,
  ]);
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
            <p>App Code :</p>
            <input
              className="input-field"
              defaultValue={portal.appCode}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, appCode: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Project Id :</p>
            <input
              className="input-field"
              defaultValue={portal.projectId}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, projectId: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Model Id</p>
            <input
              className="input-field"
              defaultValue={portal.modelId}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, modelId: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Version</p>
            <input
              className="input-field"
              defaultValue={portal.version}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, version: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Title</p>
            <input
              className="input-field"
              defaultValue={portal.title}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, title: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Description</p>
            <input
              className="input-field"
              defaultValue={portal.description}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, description: e.target.value }));
              }}
            />
          </div>
        </div>

        <button
          onClick={() => (token.isBtnActive ? updatePortal() : "")}
          className={token.isBtnActive ? "filled" : ""}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdatePortalPopup;
