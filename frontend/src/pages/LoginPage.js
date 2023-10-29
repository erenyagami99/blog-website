import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/userService";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [registered, setRegistered] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const handleLogin = async (e) => {
    const reqBody = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(reqBody);
      console.log(response, "stop");
      localStorage.setItem("token", response.token);
      if (response.token !== undefined) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleSignup = async (e) => {
    console.log(selectedImage);
    const reqBody = {
      name: name,
      email: email,
      password: password,
      profilePicture: selectedImage,
    };
    try {
      const response = await registerUser(reqBody);

      console.log("Signup response:", response);
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const picture = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setViewImage(reader.result);
    };
    reader.readAsDataURL(picture);
    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const dataForm = new FormData();
      dataForm.append("file", picture);
      dataForm.append("upload_preset", "uploads");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dulxvqaeg/image/upload",
          dataForm
        )
        .then((res) => {
          setSelectedImage(res.data.url);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (email.includes("@gmail.com") > 0 && password.length > 5) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
    if (
      email.includes("@gmail.com") > 0 &&
      password.length > 5 &&
      name.length > 0
    ) {
      setSignupActive(true);
    } else {
      setSignupActive(false);
    }
  }, [password, email, name]);

  return (
    <div className="login-container">
      {!registered ? (
        <div className="form-container">
          <h1>User Login</h1>
          <div className="login-form">
            <label htmlFor="email">Email</label>
            <div className="text-input">
              <input
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="login-input"
                autoComplete="off"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="text-input">
              <input
                className="login-input"
                type={viewPass ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {password.length > 0 && (
                <img
                  className="eye-icon"
                  onClick={() => setViewPass((prevState) => !prevState)}
                  src={
                    viewPass ? "/images/eyeOpen.svg" : "/images/eyeClose.svg"
                  }
                  alt="eyeIcon"
                />
              )}
            </div>

            <button
              onClick={() => (buttonActive ? handleLogin() : "")}
              className={buttonActive ? "filled" : ""}
            >
              Login
            </button>
            <h1>
              Haven't registered yet ?{" "}
              <span onClick={() => setRegistered(true)}>Signup</span>
            </h1>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <h1>User Registration</h1>
          <div className="login-form">
            {viewImage ? (
              <img
                src={viewImage}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <label for="profilePicture">
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="/images/user.png"
                  alt="/"
                />
              </label>
            )}
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            ></input>
            <label htmlFor="name">Name</label>
            <div className="text-input">
              <input
                id="name"
                value={name}
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="login-input"
                autoComplete="off"
              />
            </div>
            <label htmlFor="email">Email</label>
            <div className="text-input">
              <input
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="login-input"
                autoComplete="off"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="text-input">
              <input
                className="login-input"
                type={viewPass ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <img
                  className="eye-icon"
                  onClick={() => setViewPass((prevState) => !prevState)}
                  src={
                    viewPass ? "/images/eyeOpen.svg" : "/images/eyeClose.svg"
                  }
                  alt="eyeIcon"
                />
              )}
            </div>

            <button
              onClick={() => (buttonActive ? handleSignup() : "")}
              className={signupActive ? "filled" : ""}
            >
              Signup
            </button>
            <h1>
              Already registered ?{" "}
              <span onClick={() => setRegistered(false)}>Login</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
