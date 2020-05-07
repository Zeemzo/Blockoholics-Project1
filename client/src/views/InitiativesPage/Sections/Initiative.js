import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from "react-router-dom";
import * as timeago from "timeago.js";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  // root: {
  //   maxWidth: 345,
  // },
  media: {
    height: 140,
  },
});

function Initiative(props) {
  const classes = useStyles();

  useEffect(() => {
    async function fetchImage() {
    }
    fetchImage()

  }, []);
  return (

    // <Card>
    //   <CardHeader color="primary"
    //                 className={classes.cardHeader}>
    //     <h4>{props.name}</h4>
    //   </CardHeader>
    //   <CardBody>
    //     <p>{props.description}</p>

    //   </CardBody>
    // </Card>
    <>
      <Card className={classes.root} style={{ "max-height": "300px" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.name}
          />
          <CardContent container wrap="nowrap" >
            <Tooltip title={props.name}>
              <Typography noWrap gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
            </Tooltip>
            <Typography noWrap variant="body2" color="textSecondary" component="p" item xs spacing={2}>
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {props.list && <CardActions>
          {new Date() > new Date(props.endDate) ? "Ended " : "Ends " + timeago.format(props.endDate)}

          {/* <Button size="small" color="primary">
            Fund
        </Button> */}
          <Button size="small" color="primary">
            View Initiative
        </Button>

        </CardActions>}

        <Divider />

      </Card>
      <br />
    </>
  );
}

export default withRouter(Initiative)