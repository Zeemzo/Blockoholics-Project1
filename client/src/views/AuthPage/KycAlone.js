import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/covers/people-1550501_1920.jpg";
import KYC from "views/AuthPage/Components/KYC.js";

const useStyles = makeStyles(styles);

function KycAlone(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [step, setStep] = useState('KYC');
  const [previousRoute, setPreviousRoute] = useState('/');
  const classes = useStyles();

  const { ...rest } = props;

  useEffect(() => {


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
        {
          step === 'KYC' && (
            <KYC setStep={setStep} history={props.history} previousRoute={previousRoute} kycAlone={true} />
          )
        }
        <Footer whiteFont />
      </div >
    </div >
  );
}

export default KycAlone