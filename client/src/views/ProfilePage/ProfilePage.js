import React, { useEffect, useState, useLayoutEffect } from "react";
// import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

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
// import BasicDetails from "./Sections/BasicDetails.js";
// import AccountDetails from "./Sections/AccountDetails.js";
// import KYCDetails from "./Sections/KYCDetails.js";
import Transactions from "./Sections/Transactions.js";
import DetailsExpansions from "views/ProfilePage/Sections/Components/DetailsExpansions.js"

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import sidebar from "assets/img/sidebar.png";
import withAuthorization from "components/Authentication/Index.js";
import { GetAccount, getUserSession } from "services/UserManagement.js";
const useStyles = makeStyles(styles);

function ProfilePage(props) {
  // const { id } = useParams();

  const classes = useStyles();
  const { ...rest } = props;
  const [horizontal, setHorizontal] = useState({
    tabsGrid: { xs: 3, sm: 3, md: 3 },
    contentGrid: { xs: 12, sm: 9, md: 9 }
  })

  const [currentUser, setCurrentUser] = useState(getUserSession())
  const [editable, setEditable] = useState(false)
  const [user, setUser] = useState(null)
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
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12} >
                <NavPills
                  color="primary"
                  horizontal={horizontal}
                  tabs={[
                    {
                      tabButton: "Basic Details",
                      tabIcon: DetailsIcon,
                      tabContent: (
                        <Card>
                          <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>Basic Details</h4>
                          </CardHeader>
                          <CardBody>
                            <DetailsExpansions name="Alias" value={user && user.alias ? user.alias : ""} disabled={!editable} />
                            {user && user.authType != 0 ? null
                              : <DetailsExpansions name="Email" value={user && user.email ? user.email : ""} disabled={!editable} />}
                          </CardBody>
                        </Card>)
                    },
                    {
                      tabButton: "KYC Details",
                      tabIcon: SupervisedUserCircleIcon,
                      tabContent: (<Card>
                        <CardHeader color="primary" className={classes.cardHeader}>
                          <h4>KYC Details</h4>
                        </CardHeader>
                        <CardBody>
                          {user && user.kyc && <p>KYC Status: {user.kyc}</p>}
                          {editable && user && !user.kyc && <><p>Want to create an initiative or receive funds?</p>
                            <Button simple color="primary" onClick={(e) => {
                              props.history.push("/kyc")
                            }}>Do KYC</Button></>}
                          {!editable && user && !user.kyc && <><p>Want to create an initiative or receive funds?</p>
                            <Button simple color="primary" onClick={(e) => {
                              props.history.push("/kyc")
                            }}>Do KYC</Button></>}
                        </CardBody>
                      </Card>
                      )
                    }, {
                      tabButton: "Account Details",
                      tabIcon: AccountBoxIcon,
                      tabContent: (
                        <Card>
                          <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>Account Details</h4>
                          </CardHeader>
                          <CardBody>
                            <DetailsExpansions name="Public Key" value={user && user.publicKey ? user.publicKey : ""} disabled={!editable} />
                          </CardBody>
                        </Card>)
                    },
                    // {
                    //   tabButton: "Trasnsactions",
                    //   tabIcon: ReceiptIcon,
                    //   tabContent: (
                    //     <Transactions publicKey={id} />
                    //   )
                    // }
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

export default withAuthorization(authCondition)(withRouter(ProfilePage));
// export default ProfilePage;
// export default withRouter(withAuthorization(ProfilePage));