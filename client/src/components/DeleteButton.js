import { Button } from '@mui/material';
import React from "react"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteRunButton = ({rowData}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRun = () => {
     
        try {
          setOpen(false);
          const handleSubmit = async(e) => {
            
            const runid = rowData.runid;
            //const body = {runid: rowData}
            const queryString = `?runid=${encodeURIComponent(runid)}`; //?runid= deleted that part otu
            const response = await fetch(`http://localhost:3000/deleteRunData/${queryString}`, {
              method: "POST", 
              headers: {"Content-Type": "application/json"},
              //param: JSON.stringify(body)
          })
            console.log(response);
        }
        console.log("deleted");
        console.log(handleSubmit);
        } catch (err) {
            console.log(err.message);
        }
    }
  

    return(
        <div> 
            <Button 
                onClick={handleClickOpen}
                className="deleteRunButton"
                sx = {{ m: 1, marginRight: '5px'}}>
            Delete This Run 
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Deleting this run"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this run? Once you delete this run, you won't be able to retrieve it because our team doesn't know how to recall back deleted data from the database yet. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteRun} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default DeleteRunButton;