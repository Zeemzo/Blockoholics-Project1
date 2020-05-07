import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import EditIcon from '@material-ui/icons/Edit';
import Button from "components/CustomButtons/Button.js";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import CustomInput from "components/CustomInput/CustomInput.js";
// const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));


export default function DetailsExpansions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)
  const [value, setValue] = useState(props.value);
  const [name, setName] = useState(props.name);
  return (

    <div className={classes.root}>
      <ExpansionPanel disabled={props.disabled}>
        <ExpansionPanelSummary
          expandIcon={<EditIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{props.value.substring(0, 30)}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <CustomInput
              labelText={name}
              id={name}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                ), value: value, onChange: function (e) {
                  setValue(e.target.value)
                }
              }}

            />
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={() => {
            setExpanded(false)
          }}>
            Save
          </Button>
        </ExpansionPanelActions>
        <Divider />

      </ExpansionPanel>
    </div>

  );
}
