import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
import PresentToAll from "@material-ui/icons/PresentToAll";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import Schedule from "@material-ui/icons/Schedule";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import NavPills from "components/NavPills/NavPills.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import StellarSdk from "stellar-sdk";

import TransactionsExpansions from "views/ProfilePage/Sections/Components/TransactionsExpansions.js"
const useStyles = makeStyles(styles);

export default function Transactions(props) {
  var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  var lastCursor = 0; // or load where you left off

  const [sent, setSent] = useState([])
  const [received, setReceived] = useState([])

  const initialAccountHandler = (txResponse) => {

    //console.log(txResponse)
    var arrSent = sent
    var arrReceived = received

    if (txResponse.type == "payment"
      && txResponse.from == props.publicKey) {
      arrSent.push(txResponse);
    }

    if (txResponse.type == "payment"
      && txResponse.to == props.publicKey) {
      arrReceived.push(txResponse);
    }
    setSent(arrSent)
    setReceived(arrReceived)

  }


  useEffect(() => {
    async function fetch() {
      server.payments()
        .forAccount(props.publicKey)
        .cursor(lastCursor)
        .stream({
          onmessage: initialAccountHandler
        })
    }
    fetch();

  }, []);
  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <NavPills
              color="primary"
              tabs={[
                {
                  tabButton: "Sent",
                  tabIcon: PresentToAll,
                  tabContent: (
                    <>{
                      sent && sent.length > 0 && (
                        sent.map((item, index) => (
                          <TransactionsExpansions key={index} transaction={item} />
                        ))
                      )
                    }
                    </>
                  )
                },
                {
                  tabButton: "Received",
                  tabIcon: CallReceivedIcon,
                  tabContent: (
                    <>
                      {
                        received && received.length > 0 && (
                          received.map((item1, index) => (
                            <TransactionsExpansions key={index} transaction={item1} />
                          ))
                        )
                      }
                    </>

                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>

      </CardBody>

    </Card>

  );
}
