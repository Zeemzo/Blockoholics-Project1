import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import Email from "@material-ui/icons/Email";
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";


import { login } from "services/UserManagement.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';

import styles from "assets/jss/material-kit-react/views/loginPage.js";


const useStyles = makeStyles(styles);

function Login(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  // const [previousRoute, setPreviousRoute] = useState(props.previousRoute);
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  //hover and show
  const [hoverPassword, setHoverPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [linkStyle, setLinkStyle] = useState({ cursor: 'pointer' });

  //Errors 
  const [keyError, setKeyError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const Login = async (event) => {
    event.preventDefault()
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //required check
    setKeyError(key != "" || re.test(key) ? false : true);
    setPasswordError(password == "" ? true : false);
    // }
    if (key != ""
      && password != "") {
      setLoading(true)

      const response = await login(key, password)
      switch (response) {
        case 200: enqueueSnackbar("Logged In Successfully", { variant: "success" });
          props.history.push(props.previousRoute); break;
        case 201: enqueueSnackbar("Account Not Found", { variant: "warning" }); break;
        case 202: enqueueSnackbar("Password Is Incorrect", { variant: "error" }); break;
        case null: enqueueSnackbar("Login Failed", { variant: "error" });

      }
      setLoading(false)
    }

  };

  return (

    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form} onSubmit={Login} style={loading ? {
              filter: "blur(1px)",
              "-webkit-filter": "blur(1px)"
            } : null}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <CustomInput
                  error={keyError}

                  labelText="Alias/Email *"
                  id="key"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ), required: true,
                    onChange: function (e) {
                      setKey(e.target.value)
                      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                      //required check
                      setKeyError(e.target.value != "" || re.test(e.target.value) ? false : true);
                    }
                  }}
                />
                <CustomInput
                  error={passwordError}
                  labelText="Password *"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: !showPassword ? "password" : "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        {hoverPassword &&
                          <Icon style={linkStyle} onMouseEnter={() => { setHoverPassword(true) }} onMouseLeave={() => { setHoverPassword(false) }}
                            className={classes.inputIconsColor} onClick={() => {
                              setShowPassword(!showPassword)

                            }}>
                            {showPassword ? "visibilityoff" : "visibility"}</Icon>
                        }

                        {!hoverPassword &&
                          <Icon style={linkStyle} className={classes.inputIconsColor}
                            onMouseEnter={() => { setHoverPassword(true) }} onMouseLeave={() => { setHoverPassword(false) }}>
                            lock</Icon>
                        }

                      </InputAdornment>
                    ),
                    autoComplete: "off",
                    onChange: function (e) {
                      setPassword(e.target.value)
                      setPasswordError(e.target.value == "" ? true : false);
                    }
                  }}
                />
                {loading && <LinearProgress />}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg" type={"submit"} onClick={Login} disabled={loading}>
                  Login</Button>
              </CardFooter>

              <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
                Not a member?<Button simple color="primary" onClick={(e) => {
                  e.preventDefault()
                  setKeyError(false)
                  setPasswordError(false)
                  props.setStep('PRIVACY')
                }}>Register</Button>
              </Typography>

              <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
                A High Privacy User?<Button simple color="primary" onClick={(e) => {
                  e.preventDefault()
                  setKeyError(false)
                  setPasswordError(false)
                  props.setStep('SECRETLOGIN')
                }}>Use Secret Key Login</Button>
              </Typography>

            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>

  );
}

export default Login