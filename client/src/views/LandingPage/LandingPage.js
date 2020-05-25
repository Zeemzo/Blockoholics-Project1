import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import stellar from "assets/img/stellar.png";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import WhySection from "./Sections/WhySection.js";
import WhatSection from "./Sections/WhatSection.js";
import HowSection from "./Sections/HowSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="white"
        routes={dashboardRoutes}
        brand={<img height="50px" src="sidebar.png" onClick={(e) => {

          props.history.push("/")

        }}></img>}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/covers/musketeers.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your small act of kindness can make a big impact</h1>
              <h4>
                Human is a platform that helps rebuild our society by helping the ones in need by providing trust and transparency
                in the fundraising process. 
                This will make the society a brighter place where the smallest act of kindness can move mountains.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://youtu.be/E1ddGHPuZDE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <WhySection />
          <HowSection />
          <WhatSection />

          <TeamSection />
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
