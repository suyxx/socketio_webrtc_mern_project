import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contain between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid, navigation }) => {

  const handlePushToRegisterPage = () => {
    navigation("/Register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin} // Assuming onPress is used in React Native
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
