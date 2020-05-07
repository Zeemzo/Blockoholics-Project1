import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const HighPrivacyInfo = (props) => {

    const [open, setOpen] = useState(false);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const useStyles = makeStyles({
        heightty: { "min-height": "300px" }
    });
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p" sm={6}>
                        Privacy
                                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <StarIcon /><StarIcon /><StarIcon />

                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p" sm={6}>
                        Security
                                  </Typography>
                </Grid>
                <Grid item xs={6}>
                    <StarIcon /><StarIcon /><StarIcon />
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p" sm={6}>
                        Convenience
                                  </Typography>
                </Grid>
                <Grid item xs={6}>
                    <StarIcon /><StarBorderIcon /><StarBorderIcon />
                </Grid>
            </Grid>
            <Button simple color="primary" size="lg" onClick={handleClickOpen}>
                View Details</Button>
            <Dialog
                maxWidth="sm"
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                scroll={"body"}
            >
                <DialogTitle id="responsive-dialog-title">{"Low"}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>


                        <Typography variant="body1" color="textSecondary" component="p">
                            This requires the user to provide only a unique alias.


                            </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                        With great power comes great responsibility! As the power of the Secret Key resides at the user's palms, they are also responsible for not losing it.</Typography>
                        <Typography variant="body1" color="textSecondary" component="p">You lose your secret key you lose your account! </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default HighPrivacyInfo;