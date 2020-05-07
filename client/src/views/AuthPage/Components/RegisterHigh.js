import React, { useState } from "react";
import StellarSdk from "stellar-sdk";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import Select from '@material-ui/core/Select';
import People from "@material-ui/icons/People";
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomInputSelect from "components/CustomInputSelect/CustomInputSelect.js";

import { register } from "services/UserManagement.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const Keypair = StellarSdk.Keypair;

const useStyles = makeStyles(styles);

function RegisterHigh(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  //Errors 
  const [typeError, setTypeError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const ProceedRegistrationHigh = async (event) => {
    event.preventDefault()
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //required check
    setTypeError(type == "" ? true : false);
    setNameError(name == "" ? true : false);

    // }
    if (type != "" && name != "") {
      setLoading(true)
      let keypair = Keypair.random();
      props.setPublicKey(keypair.publicKey())
      props.setSecretKey(keypair.secret())

      const response = await register(name, "", "", "", "", keypair, 2)
      switch (response) {
        case 200: enqueueSnackbar("Registered Successfully", { variant: "success" });
          if (type != "Donor") {
            props.setStep('KYC')
          } else {
            props.setStep('BLOCKCHAIN')
          }
          ; break;
        case 202: enqueueSnackbar("Alias Already Exists", { variant: "warning" });
          setNameError(true); break;
        case null: enqueueSnackbar("Registration Failed", { variant: "error" });
      }
      setLoading(false)
    }
  };

  return (

    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form} onSubmit={ProceedRegistrationHigh} style={loading ? {
              filter: "blur(1px)",
              "-webkit-filter": "blur(1px)"
            } : null}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h3>REGISTRATION</h3>
              </CardHeader>
              <CardBody >
                <CustomInputSelect
                  error={typeError}
                  options={<Select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value)
                      setTypeError(e.target.value == "" ? true : false);

                    }}
                    displayEmpty
                    className={classes.selectEmpty}>
                    <MenuItem value="">
                      <em>Choose Account Intent</em>
                    </MenuItem>
                    <MenuItem value={"Receiver"}>To Receive Funds</MenuItem>
                    <MenuItem value={"Donor"}>To Donate</MenuItem>
                    <MenuItem value={"Initiative"}>To Create Initiatives</MenuItem>
                  </Select>}
                  labelText="Account Intent *"
                  id="type"
                  formControlProps={{
                    fullWidth: true
                  }} />
                <CustomInput
                  error={nameError}
                  labelText="Alias *"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    onChange: function (e) {
                      setName(e.target.value)

                      setNameError(e.target.value == "" ? true : false);


                    },
                    value: name
                  }} />

                {loading && <LinearProgress />}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg" type={"submit"} onClick={ProceedRegistrationHigh} disabled={loading}>
                  Register </Button>
              </CardFooter>
              <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
                Change your mind??<Button simple color="primary" onClick={(e) => {
                  e.preventDefault()
                  props.setStep('PRIVACY')
                }}>Go Back</Button>
              </Typography>

              <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
                Already a member?<Button simple color="primary" onClick={(e) => {
                  e.preventDefault()
                  props.setStep('LOGIN')
                }}>Login</Button>
              </Typography>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default RegisterHigh