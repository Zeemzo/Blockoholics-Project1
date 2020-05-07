import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import DetailsExpansions from "views/ProfilePage/Sections/Components/DetailsExpansions.js"

const useStyles = makeStyles(styles);

export default function BasicDetails(props) {
  const classes = useStyles();
  return (

    <Card>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Basic Details</h4>
        </CardHeader>
        <CardBody>
          <DetailsExpansions name="Name" value="Azeem" disabled />
          <DetailsExpansions name="Age" value="Azeem" />
          <DetailsExpansions name="DOB" value="Azeem" />
          
        </CardBody>
    </Card>

  );
}
