import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Username should contain between 3 and 12 characters, and password should contain between 6 and 12 characters. Also, a correct email address should be provided.";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid, navigation }) => {

  const handlePushToLoginPage = () => {
    navigation("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister} // Assuming onPress is used in React Native
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
