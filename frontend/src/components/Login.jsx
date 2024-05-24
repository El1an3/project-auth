//imports
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";

// const API_KEY = "https://project-auth-ziup.onrender.com";
const API_KEY = "http://localhost:8080";

//styling
const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;

  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  }
`;

const StyledInput = styled.input`
  width: 280px;
  background: var(--grey);
  border: none;
  border-radius: 30px;
  padding: 20px;
  height: 50px;
  margin: 10px;
  font-size: 1.1em;

  @media all and (min-width: 744px) {
    width: 450px;
  }
`;

//component
export const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_KEY}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.accessToken;
        setMessage("Sign-in successful!");
        localStorage.setItem("accessToken", accessToken);
        navigate("/dashboard");
      } else {
        setMessage("Sign-in failed: Invalid name or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginSection>
      <Header />
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          aria-label="Name"
          required
        />

        <StyledInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          aria-label="password"
          required
        />
        {/* shows error message */}
        {message && <p>{message}</p>}
      </StyledForm>
      <Button onClick={handleSubmit}>Log in</Button>
      <p>If you already have an account</p>
      <Link to={`/register`}>
        <h2>Register</h2>
      </Link>
      <Link to={`/`}>
        <p>Home</p>
      </Link>
    </LoginSection>
  );
};