import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import List from "@material-ui/icons/List";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/icons
import { getInitiatives  } from "services/KnowledgeManagement.js";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Initiative from "./Sections/Initiative.js";
import InitiativeDummy from "./Sections/InitiativeDummy.js";
import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-kit-react/views/profilePage.js";


const useStyles = makeStyles(styles);

function InitiativesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(false);

  const [initiatives, setInitiatives] = useState([])
  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const init = await getInitiatives()
      if (init != null) {
        //console.log(init)
        setInitiatives(init)
      }

      setLoading(false)
    }
    fetch();
  }, []);
  return (
    <div>
      <Header
        color="white"
        brand={<img height="50px" src="sidebar.png" onClick={(e) => {

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
          <div className={classes.container}>
            <GridContainer >
              <GridItem xs={12} sm={12} md={12} lg={12} >
                <Card style={{ "min-height": "500px" }}>
                  <CardHeader color="primary"
                    className={classes.cardHeader}
                  >
                    <h4>Initiatives</h4>
                  </CardHeader>
                  <CardBody>


                    <GridContainer justify="center">
                      {initiatives.length > 0 && initiatives.map((item, index) => (
                        <GridItem key={index} xs={12} sm={6} md={4} lg={4}>
                          <Link to={"/initiative/" + item._id}>
                            <Initiative name={item.name} image={item.cover} list={true}
                              description={item.description} endDate={item.endDate} />
                          </Link>
                        </GridItem>
                      ))}

                      {initiatives.length == 0 && !loading && <GridItem xs={12} sm={12} md={12} lg={12}
                        style={{ "text-align": "center" }}>
                        <Typography variant="h4" noWrap>No Initiatives Available</Typography>
                      </GridItem>}
                    </GridContainer>
                    {loading &&
                      // <LinearProgress />
                      <GridContainer justify="center">
                        {[0, 1, 2, 3].map(i =>
                          <GridItem key={i} xs={12} sm={6} md={4} lg={4}>
                            <InitiativeDummy list={true} />
                          </GridItem>
                        )}
                      </GridContainer>
                    }
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>



          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(InitiativesPage)