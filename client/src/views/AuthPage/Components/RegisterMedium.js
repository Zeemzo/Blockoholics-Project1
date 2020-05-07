import React, { useState } from "react";
import StellarSdk from "stellar-sdk";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import Typography from '@material-ui/core/Typography';

const Keypair = StellarSdk.Keypair;
const useStyles = makeStyles(styles);

function RegisterMedium(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryQuestion, setRecoveryQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  //hover and show
  const [hoverPassword, setHoverPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [linkStyle, setLinkStyle] = useState({ cursor: 'pointer' });

  //Errors 
  const [typeError, setTypeError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [recoveryQuestionError, setRecoveryQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);

  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const ProceedRegistrationMedium = async (event) => {
    event.preventDefault()

    //required check
    setTypeError(type == "" ? true : false);
    setNameError(name == "" ? true : false);
    setPasswordError(password == "" ? true : false);
    setConfirmPasswordError(confirmPassword == "" || password != confirmPassword ? true : false);
    setRecoveryQuestionError(recoveryQuestion == "" ? true : false);
    setAnswerError(answer == "" ? true : false);

    // }
    if (type != "" && name != ""
      && password != "" && confirmPassword != ""
      && recoveryQuestion != "" && answer != "" && password == confirmPassword) {
      setLoading(true)
      let keypair = Keypair.random();
      props.setPublicKey(keypair.publicKey())
      props.setSecretKey(keypair.secret())

      const response = await register(name, "", password, recoveryQuestion, answer, keypair, 1)
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
            <form className={classes.form} onSubmit={ProceedRegistrationMedium} style={loading ? {
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
                  id="alias"
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
                          <Icon style={linkStyle}
                            onMouseEnter={() => { setHoverPassword(true) }} onMouseLeave={() => { setHoverPassword(false) }}
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
                    ,
                    value: password
                  }} />
                <CustomInput
                  error={confirmPasswordError}
                  labelText="Confirm Password *"
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock
                   </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                    onChange: function (e) {
                      setConfirmPassword(e.target.value)

                      setConfirmPasswordError(e.target.value == "" || password != e.target.value ? true : false);

                    },
                    value: confirmPassword
                  }} />
                <CustomInputSelect
                  error={recoveryQuestionError}
                  options={<Select
                    value={recoveryQuestion}
                    onChange={(e) => {
                      setRecoveryQuestion(e.target.value)

                      setRecoveryQuestionError(e.target.value == "" ? true : false);
                    }}
                    displayEmpty
                    className={classes.selectEmpty}>
                    <MenuItem value="">
                      <em>Select Recovery Question</em>
                    </MenuItem>
                    <MenuItem value={"What's your mother's mainden name?"}>What's your mother's mainden name?</MenuItem>
                    <MenuItem value={"What's the name of your first pet?"}>What's the name of your first pet?</MenuItem>
                  </Select>}
                  labelText="Recovery Question *"
                  id="question"
                  formControlProps={{
                    fullWidth: true
                  }} />
                {recoveryQuestion &&
                  <CustomInput
                    error={answerError}
                    labelText="Answer *"
                    id="answer"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock
                 </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                      onChange: function (e) {
                        setAnswer(e.target.value)

                        setAnswerError(e.target.value == "" ? true : false);
                      },
                      value: answer
                    }} />
                }
                {loading && <LinearProgress />}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button color="primary" size="lg" type={"submit"} onClick={ProceedRegistrationMedium} disabled={loading}>
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

export default RegisterMedium