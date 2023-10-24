import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../services/userService";

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

  const handleLogin = async (e) => {
    const reqBody = {
      email: email,
      password: password,
    };

    try {
      console.log("Sending API request...");
      const response = await loginUser(reqBody);

      localStorage.setItem("token", response.token);

      console.log("srinivas", response);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleSignup = async (e) => {
    console.log(selectedImage);
    const formData = new FormData();

    if (selectedImage) {
      formData.append("profilePicture", selectedImage);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      console.log(formData, "sri");
      const response = await registerUser(formData);

      console.log("Signup response:", response);
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
            {selectedImage ? (
              <img
                src={selectedImage}
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
