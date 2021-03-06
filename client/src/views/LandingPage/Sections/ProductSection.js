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
import Divider from '@material-ui/core/Divider';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import stellar from "assets/img/stellar.png";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk Human Fund</h2>
          <Divider />
          <h4 className={classes.description}>
            100% Transparent, Trusted and Secure Blockchain based fund raising platform for non profit activities built on Stellar.
          </h4>
          <img src={stellar} width="100px"/>
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
