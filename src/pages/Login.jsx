import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const { currentUser, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(currentUser);
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  // console.log(input);
  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
        />

        <input
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
