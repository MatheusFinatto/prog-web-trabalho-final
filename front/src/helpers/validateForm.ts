import { Dispatch } from "react";
import emailIsValid from "./isEmailValid";

interface ValidateForm {
  email: string;
  username: string;
  password: string;
  text: string;
  setError: Dispatch<React.SetStateAction<string>>;
}

const validateForm = ({
  email,
  username,
  password,
  setError,
  text,
}: ValidateForm): boolean => {
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

export default validateForm;
