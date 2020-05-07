import React, { useState } from "react";
import { SingleSelect } from "react-select-material-ui";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
const SingleSelectPage = (props) => {


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const useStyles = makeStyles({
        heightty: { "min-height": "300px" }
    });
    const classes = useStyles();

    return (
        <>
            {/* <Button simple color="primary" size="lg" onClick={props.handleClickOpen}>
                Select Recipient Account</Button> */}
            <Dialog
                maxWidth="md"
                // fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                scroll={"body"}
            >
                <DialogTitle id="responsive-dialog-title">{"Search Our User Pool For Your Recipient."}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <SingleSelect value={props.value}
                            placeholder={props.placeholder}
                            options={props.options}
                            onChange={props.onChange} style={{
                                "min-height": "200px",
                            }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose} color="primary">
                        Close          </Button>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Select          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SingleSelectPage;