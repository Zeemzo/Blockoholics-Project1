import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import Image1 from "assets/img/why/1.png";
import Image2 from "assets/img/why/2.png";
import Image3 from "assets/img/why/3.png";
import Image4 from "assets/img/why/4.png";
import Image5 from "assets/img/why/5.png";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function WhySection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Why Human Fund</h2>
          <Divider />
          <h4 className={classes.description}>
            Raising funds and giving donations for a non profit activity is harder even in this digital era.
          </h4>
          <GridContainer justify="center" style={{ margin: "50px 0px 0px 0px" }}>
            <GridItem lg={6}><img width="50px" src={Image1}></img>
              <h5 className={classes.description}>
                Lack/no transparency in fund raising</h5>
            </GridItem>
            <GridItem lg={6}><img width="50px" src={Image2}></img>
              <h5 className={classes.description}>
                NGO’s/ Governments face many difficulty to raise funds
            </h5>

            </GridItem>
            <GridItem lg={6}><img width="50px" src={Image3}></img>
              <h5 className={classes.description}>
                No traceability where the fund is used
            </h5>

            </GridItem>
            <GridItem lg={6}><img width="50px" src={Image4}></img>
              <h5 className={classes.description}>
                Difficult and untrusted donation methods
            </h5>

            </GridItem>
            <GridItem lg={6}><img width="50px" src={Image5}></img>
              <h5 className={classes.description}>
                Wide range of scam projects
            </h5>

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
