import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography';


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";


import { loginWithSecret } from "services/UserManagement.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';

import styles from "assets/jss/material-kit-react/views/loginPage.js";


const useStyles = makeStyles(styles);

function SecretLogin(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [previousRoute, setPreviousRoute] = useState(props.previousRoute);
  const [secretKey, setSecretKey] = useState("");

  const [loading, setLoading] = useState(false);
  //hover and show
  const [hoverPassword, setHoverPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [linkStyle, setLinkStyle] = useState({ cursor: 'pointer' });

  //Errors 
  const [secretKeyError, setSecretKeyError] = useState(false);


  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const Login = async (event) => {
    event.preventDefault()

    //required check
    setSecretKeyError(secretKey == "" ? true : false);
    if (secretKey != "") {
      setLoading(true)

      const response = await loginWithSecret(secretKey)
      switch (response) {
        case 200: enqueueSnackbar("Logged In Successfully", { variant: "success" });
          props.history.push(previousRoute); break;
        case 201: enqueueSnackbar("Account Not Found", { variant: "warning" });
          setSecretKeyError(true); break;
        case 202: enqueueSnackbar("Secret Key is Invalid", { variant: "error" });
          setSecretKeyError(true); break;
        case null: enqueueSnackbar("Secret Key is Invalid", { variant: "error" });
          setSecretKeyError(true);
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
                <h3>Secret Key Login</h3>
              </CardHeader>
              <CardBody>
                <CustomInput
                  error={secretKeyError}
                  labelText="Secret Key *"
                  id="secretKey"
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
                      setSecretKey(e.target.value)
                      setSecretKeyError(e.target.value == "" ? true : false);
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
                  props.setStep('PRIVACY')
                }}>Register</Button>
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" align={"center"}>
                Not A High Privacy User?<Button simple color="primary" onClick={(e) => {
                  e.preventDefault()
                  props.setStep('LOGIN')
                }}>Classical Login</Button>
              </Typography>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>

  );
}

export default SecretLogin