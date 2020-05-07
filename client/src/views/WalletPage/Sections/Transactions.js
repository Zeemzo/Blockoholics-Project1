import React from "react";
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

import PresentToAll from "@material-ui/icons/PresentToAll";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
// import Schedule from "@material-ui/icons/Schedule";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import NavPills from "components/NavPills/NavPills.js";
import StellarSdk from "stellar-sdk";
import { StellarUrl } from "variables/constants";
import TransactionsExpansions from "views/WalletPage/Sections/Components/TransactionsExpansions.js"
import CardHeader from "components/Card/CardHeader.js";

var server = new StellarSdk.Server(StellarUrl);
var lastCursor = 0; // or load where you left off
class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: [],
      received: [],
      test: () => { }
    };
  }

  componentDidMount() {
    const walletRef = server.payments()
      .forAccount(this.props.publicKey)
      .cursor(lastCursor)
    this.setState({
      test: walletRef
        .stream({
          onmessage:
            (txResponse) => {
              var arrSent = this.state.sent
              var arrReceived = this.state.received

              if (txResponse.type == "payment"
                && txResponse.from == this.props.publicKey && txResponse.asset_type != "native") {
                arrSent.push(txResponse);
              }

              if (txResponse.type == "payment"
                && txResponse.to == this.props.publicKey && txResponse.asset_type != "native") {
                arrReceived.push(txResponse);
              }
              this.setState({ sent: arrSent })
              this.setState({ received: arrReceived })

            }
        })
    })
  }
  componentWillUnmount() {
    this.state.test()
  }


  render() {
    return (
      <Card>
        <CardHeader color="primary">
          <h4>Transactions</h4>
        </CardHeader>
        <CardBody>
          {/* <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}> */}
          {this.props.user &&
            <NavPills
              color="primary"
              tabs={[
                {
                  tabButton: "Sent",
                  tabIcon: PresentToAll,
                  tabContent: (
                    <>{
                      this.state.sent && this.state.sent.length > 0 && (
                        this.state.sent.map((item, index) => (
                          <TransactionsExpansions key={index} transaction={item} />
                        ))
                      )
                    }
                      {
                        this.state.sent && this.state.sent.length <= 0 &&
                        <GridItem xs={12} sm={12} md={12} lg={12}
                          style={{ "text-align": "center" }}>
                          <Typography variant="h4" noWrap>No Sent Transactions</Typography>
                        </GridItem>
                      }
                    </>
                  )
                }, {
                  tabButton: "Received",
                  tabIcon: CallReceivedIcon,
                  tabContent: (
                    <>
                      {
                        this.props.user.verified && this.state.received && this.state.received.length > 0 && (
                          this.state.received.map((item1, index) => (
                            <TransactionsExpansions key={index} transaction={item1} />
                          ))
                        )
                      }
                      {
                        this.props.user.verified && this.state.received && this.state.received.length <= 0 &&
                        <GridItem xs={12} sm={12} md={12} lg={12}
                          style={{ "text-align": "center" }}>
                          <Typography variant="h4" noWrap>No Received Transactions</Typography>
                        </GridItem>
                      }
                    </>

                  )
                }

              ]}
            />}
          {/* 
            </GridItem>
          </GridContainer> */}

        </CardBody>

      </Card>

    );
  }
}
export default Transactions
