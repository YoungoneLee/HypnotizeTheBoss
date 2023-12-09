import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from "react"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteRunButton = ({rowData}) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleClickOpen = () => {
      console.log("hits the open")  
      setOpen(true);

    };

    const handleClose = () => {
      console.log("huh");
        setOpen(false);
    };


    const deleteCurrentRun = async(e) => {

      console.log("this is the rowDAta: " + rowData.toString());
      console.log("this is the runid: " + rowData.runid.toString());

      
      try {
        const runid = rowData.runid;
        //const body = {runid: rowData}
        // const queryString = `?runid=${encodeURIComponent(runid)}`; //?runid= deleted that part otu
        // console.log("this is the runid: " + queryString.toString());
        // const response = await fetch(`http://localhost:3000/deleteRunData/${queryString}`, {
        const runidString = runid
        console.log("runidString: " + runidString);
        const response = await fetch(`http://localhost:3000/deleteRunData/${runidString}`, {

          method: "DELETE", 
          headers: {"Content-Type": "application/json"},
          //param: JSON.stringify(body)
      })
        const jsonData = await response.json();
        console.log(jsonData);
        setOpen(false);

      } catch (err) {
        console.log(err.message);
      }
      
      navigate("/about");
      //<Navigate to="/searchResult" replace={true} />
      //await redirect("/about");
    }


    // const deleteRun = () => {
    //   console.log("within the delete run")
    //     try {
    //       setOpen(false);
    //       const handleSubmit = async(e) => {
            
    //         const runid = rowData.runid;
    //         //const body = {runid: rowData}
    //         const queryString = `?runid=${encodeURIComponent(runid)}`; //?runid= deleted that part otu
    //         console.log("this is the runid: " + queryString.toString());
    //         const response = await fetch(`http://localhost:3000/deleteRunData/${queryString}`, {
    //           method: "DELETE", 
    //           headers: {"Content-Type": "application/json"},
    //           //param: JSON.stringify(body)
    //       })
    //         const jsonData = await response.json();
    //         console.log(jsonData);
    //     }
    //     console.log("deleted");
    //     console.log(handleSubmit);
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }
  

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
          <Button onClick={deleteCurrentRun} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default DeleteRunButton;