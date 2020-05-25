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

export default function HowSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>How to use Human Fund</h2>
          <Divider />
          <h4 className={classes.description}>
            Donor's Flow
          </h4>
          <GridContainer justify="center" style={{ margin: "50px 0px 50px 0px" }}>

            <GridItem lg={12}>
              <img width="100%" src={Image1} />
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>1 - User register/login to the platform </h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>2 - Make an online payment and buy life coin</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>3 - Select initiatives</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>4 - Make donations using life coin</h5>
            </GridItem>

          </GridContainer>
          <Divider />
          <h4 className={classes.description}>
          Initiator's Flow
          </h4>
          <GridContainer justify="center" style={{ margin: "50px 0px 50px 0px" }}>

            <GridItem lg={12}>
              <img width="100%" src={Image2} />
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>1 - NGO’s/Government register/login to the platform </h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>2 - Create and initiative with all the required details</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>3 - Receive the donations in life coin</h5>
            </GridItem>
            <GridItem lg={6}>
              <h5 className={classes.description}>4 - Send the life coin to the platform and convert to fiat</h5>
            </GridItem>

          </GridContainer>
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
