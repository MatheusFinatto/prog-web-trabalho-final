import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./styles.css";

import { UserData, useUserContext } from "../../../contexts/UserContext";
import validateForm from "../../../helpers/validateForm";
import { useNavigate } from "react-router";

interface FormProps {
  text: string;
}

const UserForm: React.FC<FormProps> = ({ text }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState<UserData>({ userId: null, username: null });
  const { updateUser } = useUserContext();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (validateForm({ username, email, password, setError, text })) {
      try {
        const res = await fetch("http://localhost:8080/v1/register", {
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

        const userResponse = await res.json();
        console.log(
          "🚀 ~ file: index.tsx:43 ~ handleRegister ~ data:",
          userResponse
        );

        if (!res.ok) {
          throw new Error("Unknown error");
        }
        setUser({ userId: "5", username });
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        setError("An unexpected error has occurred. Please try again later.");
        console.error(err);
      } finally {
        setUsername("");
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (validateForm({ username, email, password, setError, text })) {
      try {
        const res = await fetch("http://localhost:8080/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (!res.ok) {
          throw new Error("Unknown error");
        }

        //FIXME: get user id from database; ill be mocking it for now with the number '5'
        setUser({ userId: "5", username });
        updateUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.getItem("user"));
      } catch (err) {
        setError("An unexpected error has occurred. Please try again later.");
        console.error(err);
      } finally {
        setUsername("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    updateUser(user);
    user.username && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1>{text}</h1>
      {error && <span id="error">{error}</span>}
      <form
        className="userForm"
        onSubmit={text === "Register" ? handleRegister : handleLogin}
      >
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
          <div className="passwordInput">
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
