import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Image1 from "assets/img/how/1.png";
import Image2 from "assets/img/how/1.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(styles);

export default function WhatSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What it can do</h2>
          <Divider />
          <GridContainer justify="center" style={{ margin: "50px 0px 50px 0px" }}>
            <GridItem lg={6}>
              <h5 className={classes.description}>Easy to raise more funds quickly</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>Easy to do donations</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>Easy to track where the money is actually used</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>Blockchain based Secure fund raising platform </h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>Easy to get young generation involved in donations and helping others</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>Governments and authorities are able to track and audit the donations </h5>
            </GridItem>  </GridContainer>

        </GridItem>
      </GridContainer>
      {/* <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Community Verified Users"
              description=""
              icon={VerifiedUser}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Authority Verified Users"
              description=""
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div> */}
    </div>
  );
}
