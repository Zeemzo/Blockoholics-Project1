import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import FileCopyIcon from '@material-ui/icons/FileCopy';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import { useSnackbar } from 'notistack';
// import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

function BlockchainCredentials(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);


  const [secretKey, setSecretKey] = useState(props.secretKey);
  const [publicKey, setPublicKey] = useState(props.publicKey);

  const [canProceed, setCanProceed] = useState(false);

  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const copyMessage = (val) => {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }



  return (

    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h3>BLOCKCHAIN ACCOUNT</h3>
                <h5>powered by Stellar</h5>
              </CardHeader>
              <p className={classes.divider}>Here are your Blockchain Credentials</p>
              <CardBody>

                <List component="nav" className={classes.root} aria-label="keypair">
                  <ListItem>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Public Key"} />
                  </ListItem>
                  <ListItem button onClick={() => {
                    copyMessage(publicKey);
                    enqueueSnackbar("Public Key Copied", { variant: "info" })
                  }}>
                    <ListItemText primary={publicKey} />
                    <FileCopyIcon />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Secret Key"} />
                  </ListItem>
                  <ListItem button onClick={() => {
                    copyMessage(secretKey);
                    enqueueSnackbar("Secret Key Copied", { variant: "info" })
                  }}>
                    <ListItemText primary={secretKey} /> <FileCopyIcon />
                  </ListItem>
                </List>
              </CardBody>

              <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg" onClick={() => {
                  var FileSaver = require("file-saver");
                  var blob = new Blob(
                    [
                      "PublicKey: " +
                      publicKey +
                      " \nSecretKey: " +
                      secretKey
                    ],
                    { type: "text/plain;charset=utf-8" }
                  );
                  FileSaver.saveAs(blob, "Human_Credentials.txt");

                  setCanProceed(true);
                }}>
                  Export to file </Button>
                <Button color="primary" size="lg" disabled={!canProceed} onClick={() => {
                  props.history.push(props.previousRoute);
                }}>
                  Proceed </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default BlockchainCredentials