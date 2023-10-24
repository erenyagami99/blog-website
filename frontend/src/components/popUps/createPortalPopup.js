import React, { useState, useEffect } from "react";
import { createBlog } from "../../services/blogService";

const CreatePortalPopup = (props) => {
  const { setModal } = props;

  const [token, setToken] = useState({
    projectId: "",
    appCode: "",
    modelId: "",
    version: "",
    title: "",
    description: "",
    isBtnActive: false,
  });
  const createPortal = async (e) => {
    const reqBody = {
      appCode: token.appCode,
      projectId: token.projectId,
      modelId: token.modelId,
      version: token.version,
      title: token.title,
      description: token.description,
    };
    await createBlog(reqBody);
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
              defaultValue={token.appCode}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, appCode: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Project Id :</p>
            <input
              className="input-field"
              defaultValue={token.projectId}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, projectId: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Model Id</p>
            <input
              className="input-field"
              defaultValue={token.modelId}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, modelId: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Version</p>
            <input
              className="input-field"
              defaultValue={token.version}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, version: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Title</p>
            <input
              className="input-field"
              defaultValue={token.title}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, title: e.target.value }));
              }}
            />
          </div>
          <div className="input-div">
            <p>Description</p>
            <input
              className="input-field"
              defaultValue={token.description}
              onChange={(e) => {
                setToken((pre) => ({ ...pre, description: e.target.value }));
              }}
            />
          </div>
        </div>

        <button
          onClick={() => (token.isBtnActive ? createPortal() : "")}
          className={token.isBtnActive ? "filled" : ""}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePortalPopup;
