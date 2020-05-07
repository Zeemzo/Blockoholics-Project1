import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { SnackbarProvider} from 'notistack';

import "assets/scss/material-kit-react.scss?v=1.8.0";
import "assets/css/custom.css";
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import WalletPage from "views/WalletPage/WalletPage.js";
import AuthPage from "views/AuthPage/AuthPage.js";
import InitiativesPage from "views/InitiativesPage/InitiativesPage";
import SingleInitiativesPage from "views/InitiativesPage/SingleInitiativesPage";
import CreateInitiativePage from "views/CreateInitiativePage/CreateInitiativePage";
import KycAlone from "views/AuthPage/KycAlone";

var hist = createBrowserHistory();

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>

    <Router history={hist}>
      <Switch>
        <Route path="/components" component={Components} />

        <Route path="/home" component={LandingPage} />
        <Route path="/profile/:id" component={ProfilePage} />

        <Route path="/wallet/:id" component={WalletPage} />

        <Route path="/auth" component={AuthPage} />

        <Route path="/initiatives" component={InitiativesPage} />
        <Route path="/initiative/:id" component={SingleInitiativesPage} />

        <Route path="/createInitiative" component={CreateInitiativePage} />
        <Route path="/kyc" component={KycAlone} />

        {/* 

        <Route path="/beneficiaries" component={BeneficiariesPage} />
        <Route path="/beneficiary/:id" component={SingleBeneficiariesPage} /> */}

        {/* <Route path="/accreditedBodies" component={AuthPage} />
        <Route path="/accreditedBody/:id" component={AuthPage} /> */}

        <Route path="/wallet/:id" component={AuthPage} />

        <Redirect from="/" to="/home" />

      </Switch>
    </Router>    </SnackbarProvider>
  ,
  document.getElementById("root")
);
