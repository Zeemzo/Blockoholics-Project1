import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/covers/people-1550501_1920.jpg";

import Login from "views/AuthPage/Components/Login.js";
import SecretLogin from "views/AuthPage/Components/SecretLogin.js";
import RegisterLow from "views/AuthPage/Components/RegisterLow.js";
import RegisterMedium from "views/AuthPage/Components/RegisterMedium.js";
import RegisterHigh from "views/AuthPage/Components/RegisterHigh.js";
import Privacy from "views/AuthPage/Components/Privacy.js";
import KYC from "views/AuthPage/Components/KYC.js";

import BlockchainCredentials from "views/AuthPage/Components/BlockchainCredentials.js";

const useStyles = makeStyles(styles);

function AuthPage(props) {
  const [step, setStep] = useState('LOGIN');
  const [previousRoute, setPreviousRoute] = useState('/');
  const [secretKey, setSecretKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const classes = useStyles();

  const { ...rest } = props;

  useEffect(() => {
    if (props.location.search && props.location.search != "") {
      const from = props.location.search.split("=");
      const route = atob(from[1]);
      setPreviousRoute(route);
    }

  }, []);
  return (
    <div>
      <Header
        fixed
        color="white"
        brand={<img height="50px" src="sidebar.png" onClick={(e) => {
          props.history.push("/")
        }}></img>}
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "fixed",
          backgroundPosition: "top center"
        }}
      >
        {step === 'LOGIN' && (
          <Login previousRoute={previousRoute} setStep={setStep} history={props.history} />
        )}
        {step === 'SECRETLOGIN' && (
          <SecretLogin previousRoute={previousRoute} setStep={setStep} history={props.history}/>
        )}
        {step === 'PRIVACY' && (
          <Privacy setStep={setStep} history={props.history} />
        )
        }
        {
          step === 'REGISTERLOW' && (
            <RegisterLow previousRoute={previousRoute} setStep={setStep} history={props.history}
              setSecretKey={setSecretKey} setPublicKey={setPublicKey} />
          )
        }
        {
          step === 'REGISTERMEDIUM' && (
            <RegisterMedium previousRoute={previousRoute} setStep={setStep} history={props.history}
              setSecretKey={setSecretKey} setPublicKey={setPublicKey} />
          )
        }
        {
          step === 'REGISTERHIGH' && (
            <RegisterHigh previousRoute={previousRoute} setStep={setStep} history={props.history}
              setSecretKey={setSecretKey} setPublicKey={setPublicKey} />
          )
        }
        {
          step === 'KYC' && (
            <KYC setStep={setStep} history={props.history} previousRoute={previousRoute} kycAlone={false} />
          )
        }
        {
          step === 'BLOCKCHAIN' && (
            <BlockchainCredentials previousRoute={previousRoute} setStep={setStep}
              history={props.history} secretKey={secretKey} publicKey={publicKey} />
          )
        }
        <Footer whiteFont />
      </div >
    </div >
  );
}

export default AuthPage