import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../../contexts/GlobalContext.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
 
  let state = useContext(GlobalContext);
  
  const history = useHistory();
  
  const handleClickprops = () => {
    props.setDialog(true);
  };

  const handleClose = () => {
    props.setDialog(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    state.toggleLogin();
    props.setDialog(false);
    history.push('/');
  }

  return (
    <div>
      <Dialog
        open={props.dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You sure You Want To Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor : "black" , color : "white"}} onClick={handleClose} >
            No
          </Button>
          <Button style={{ backgroundColor : "black" ,  color : "white"}} onClick={logout} >
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
