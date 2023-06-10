import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./styles.css";

import { useUserContext } from "../../contexts/UserContext";

interface FormProps {
  text: string;
}

const UserForm: React.FC<FormProps> = ({ text }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { updateUser } = useUserContext();

  const validateForm = (): boolean => {
    if (text === "Register" && !emailIsValid(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (username.trim() === "") {
      setError("Please enter a username");
      return false;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return false;
    }

    setError("");
    return true;
  };

  const emailIsValid = (email: string): boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (validateForm()) {
      try {
        const res = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (!res.ok) {
          throw new Error("Unknown error");
        }
        const { token } = await res.json();
        localStorage.setItem("token", token);
        updateUser(username);
      } catch (err) {
        setError("An unexpected error has occurred. Please try again later.");
        console.log(err);
      } finally {
        setUsername("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <>
      <h1>{text}</h1>
      {error && <span id="error">{error}</span>}
      <form className="userForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {text === "Register" && (
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </i>
          </div>
        </div>
        <button>{text}</button>
      </form>
    </>
  );
};

export default UserForm;
