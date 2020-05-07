import React, { useEffect, useState, useLayoutEffect } from "react";
// import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import DetailsIcon from '@material-ui/icons/Details';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import BasicDetails from "./Sections/Balance.js";
// import AccountDetails from "./Sections/AccountDetails.js";
// import KYCDetails from "./Sections/KYCDetails.js";
import Transactions from "./Sections/Transactions.js";
import DetailsExpansions from "views/WalletPage/Sections/Components/DetailsExpansions.js"
import Balance from "views/WalletPage/Sections/Balance.js"

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import sidebar from "assets/img/sidebar.png";
import withAuthorization from "components/Authentication/Index.js";
import { GetAccount, getUserSession } from "services/UserManagement.js";
const useStyles = makeStyles(styles);

function WalletPage(props) {
  // const { id } = useParams();

  const classes = useStyles();
  const { ...rest } = props;
  const [horizontal, setHorizontal] = useState({
    tabsGrid: { xs: 3, sm: 3, md: 3 },
    contentGrid: { xs: 12, sm: 9, md: 9 }
  })

  const [currentUser, setCurrentUser] = useState(getUserSession())
  const [editable, setEditable] = useState(false)
  const [user, setUser] = useState(getUserSession())
  const { id } = props.match.params
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setHorizontal({
        tabsGrid: { xs: 3, sm: 3, md: 3 },
        contentGrid: { xs: 12, sm: 9, md: 9 }
      })
    }
    // async function fetchData() {
    //   const account = await GetAccount(id)
    //   if (account != null) {
    //     if (id == currentUser.publicKey)
    //       setEditable(true)
    //     //console.log(account)
    //     setUser(account)
    //   }
    // }
    // fetchData()
  }, [id]);

  useLayoutEffect(() => {
    async function fetchData() {
      const account = await GetAccount(id)
      if (account != null) {
        if (id == currentUser.publicKey)
          setEditable(true)
        //console.log(account)
        setUser(account)
      }
    }
    fetchData()
  }, [id]);
  return (
    <div>
      <Header
        color="white"
        brand={<img height="50px" src={sidebar} onClick={(e) => {

          props.history.push("/")

        }}></img>}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax style={{ height: "200px" }} small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container} style={{ "min-height": "500px" }}>
            <GridContainer >
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="primary"
                  horizontal={horizontal}
                  tabs={[
                    {
                      tabButton: "Balance",
                      tabIcon: ReceiptIcon,
                      tabContent: (
                        <Balance publicKey={id} user={user} />
                      )
                    },
                    {
                      tabButton: "Trasnsactions",
                      tabIcon: ReceiptIcon,
                      tabContent: (
                        <Transactions publicKey={id} user={user} />
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withRouter(WalletPage));
// export default ProfilePage;
// export default withRouter(withAuthorization(ProfilePage));