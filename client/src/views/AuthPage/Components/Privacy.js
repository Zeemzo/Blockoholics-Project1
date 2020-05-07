import React from "react";
import StellarSdk from "stellar-sdk";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Fingerprint from "@material-ui/icons/Fingerprint";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { Link } from "react-router-dom";

import LowPrivacyInfo from "views/AuthPage/PrivacyInfo/LowPrivacyInfo.js";
import HighPrivacyInfo from "views/AuthPage/PrivacyInfo/HighPrivacyInfo.js";
import MediumPrivacyInfo from "views/AuthPage/PrivacyInfo/MediumPrivacyInfo.js";



const useStyles = makeStyles(styles);


function Privacy(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9} >
          <Card className={classes[cardAnimaton]}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h3>Pick Your Poison</h3>
            </CardHeader>
            <CardBody>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                <p className={classes.divider}>Users are able to decide the level of
                PRIVACY and SECURITY they desire according to their CONVENIENCE of
                handling their respective Blockchain Credentials.
                    Choose a level below to continue.</p>
              </Typography>

            </CardBody>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4} >

                  <Card className={classes[cardAnimaton]}>
                    <Link onClick={(e) => {
                      e.preventDefault()
                      props.setStep('REGISTERLOW')
                    }} >
                      <CardHeader color="danger"
                        className={classes.cardHeader + " btn"}
                        style={{ hover: 50 }}  >
                        <h3>
                          Low<Fingerprint style={{ fontSize: 40 }} /></h3>
                      </CardHeader>
                    </Link>
                    <CardBody row>
                      <LowPrivacyInfo />
                    </CardBody>

                  </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={4} >
                  <Card className={classes[cardAnimaton]} >
                    <Link onClick={(e) => {
                      e.preventDefault()
                      props.setStep('REGISTERMEDIUM')
                    }} >
                      <CardHeader color="warning"
                        className={classes.cardHeader + " btn"}
                        style={{ hover: 50 }}  >
                        <h3>
                          Medium<Fingerprint style={{ fontSize: 40 }} /></h3>
                      </CardHeader>
                    </Link>
                    <CardBody row>
                      <MediumPrivacyInfo />

                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4} >

                  <Card className={classes[cardAnimaton]} >
                    <Link onClick={(e) => {
                      e.preventDefault()
                      props.setStep('REGISTERHIGH')
                    }} >
                      <CardHeader color="success"
                        className={classes.cardHeader + " btn"}
                        style={{ hover: 50 }}  >
                        <h3>
                          High<Fingerprint style={{ fontSize: 40 }} /></h3>
                      </CardHeader>
                    </Link>
                    <CardBody row>
                      <HighPrivacyInfo />

                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </CardBody>
            <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
              Already a member?<Button simple color="primary" onClick={(e) => {
                e.preventDefault()
                props.setStep('LOGIN')
              }}>Login</Button>
            </Typography>

          </Card>
        </GridItem>
      </GridContainer>
    </div>

  );
}

export default Privacy