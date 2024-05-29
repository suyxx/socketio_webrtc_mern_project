import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { closeAlertMessage } from "../../store/actions/alertActions";

const AlertNotification = () => {
  const showAlertMessage = useSelector((state) => state.alert.showAlertMessage);
  const alertMessageContent = useSelector((state) => state.alert.alertMessageContent);
  const dispatch = useDispatch();

  const handleCloseAlertMessage = () => {
    dispatch(closeAlertMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={handleCloseAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
