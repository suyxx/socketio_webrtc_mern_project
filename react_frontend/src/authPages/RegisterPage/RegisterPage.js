import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../shared/utils/validators";
import { useDispatch } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useNavigation

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useNavigation

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    console.log("register clicked");
    const userDetails = {
      mail,
      password,
      username,
    };

    const actions = getActions(dispatch); // Call getActions with dispatch
    actions.register(userDetails, navigate);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
        navigation={navigate} // Pass navigate instead of navigation
      />
    </AuthBox>
  );
};

export default RegisterPage;
