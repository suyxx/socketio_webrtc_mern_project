import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateMail } from "../../shared/utils/validators";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { sendFriendInvitation } from "../../store/actions/friendsActions";

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const handleSendInvitation = () => {
    dispatch(sendFriendInvitation({ targetMailAddress: mail }));
    if (typeof closeDialogHandler === 'function') {
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    if (typeof closeDialogHandler === 'function') {
      closeDialogHandler();
      setMail("");
    }
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Enter the email address of the friend you would like to invite
            </Typography>
          </DialogContentText>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="Enter email address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
