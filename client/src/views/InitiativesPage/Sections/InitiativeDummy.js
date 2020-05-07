import React from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from "react-router-dom";
// import * as timeago from "timeago.js";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";


const useStyles = makeStyles({


  media: {
    height: 140,
  },
});

function InitiativeDummy(props) {
  const classes = useStyles();

  return (

    <>
      <Card className={"loadingCard"} style={{ "max-height": "300px" }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image={props.image}
            title={"******* *** ****"}
          />
          <CardContent container wrap="nowrap">
            <Typography noWrap gutterBottom variant="h5" component="h2">
              ******* *** ****</Typography>
            <Typography noWrap variant="body2" color="textSecondary" component="p" item xs spacing={2}>
              ***** ***** ********* ******
            </Typography>
          </CardContent>
        </CardActionArea>
        {props.list &&
          <CardActions>
            <Button size="small" color="primary">
              **** ** * *****      </Button>
            <Button size="small" color="primary">
              **** ********      </Button>
          </CardActions>
        }
        <Divider />
      </Card>
      <br />
    </>
  );
}

export default withRouter(InitiativeDummy)