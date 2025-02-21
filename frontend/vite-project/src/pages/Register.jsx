import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./regis.css"

function Register({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8800/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data);
      alert("Registration successful!");
      navigate(data.isAdmin ? "/admin" : "/user");
    } else {
      alert(data.message || "Registration failed.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <label>
          <input type="checkbox" name="isAdmin" onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })} />
          Admin
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
