import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", input);
      // console.log(res.data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };
  // console.log(input);
  return (
    <div className="login">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          onChange={handleChange}
          name="email"
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
          Do you have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
