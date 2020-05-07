import React, { useState } from "react";
import MaterialTable from 'material-table';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
import Dashboard from "@material-ui/icons/Dashboard";
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

const useStyles = makeStyles(styles);

export default function Transactions() {
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
  const classes = useStyles();
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
                  tabIcon: Dashboard,
                  tabContent: (
                    <MaterialTable
                      title="Editable Example"
                      columns={state.columns}
                      data={state.data}
                      editable={{
                        onRowAdd: (newData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              if (oldData) {
                                setState((prevState) => {
                                  const data = [...prevState.data];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                              }
                            }, 600);
                          }),
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                      }}
                    />
                  )
                },
                {
                  tabButton: "Received",
                  tabIcon: Schedule,
                  tabContent: (
                    <span>
                      <p>
                        Efficiently unleash cross-media information without
                        cross-media value. Quickly maximize timely
                        deliverables for real-time schemas.
                        </p>
                      <br />
                      <p>
                        Dramatically maintain clicks-and-mortar solutions
                        without functional solutions. Dramatically visualize
                        customer directed convergence without revolutionary
                        ROI. Collaboratively administrate empowered markets
                        via plug-and-play networks. Dynamically procrastinate
                        B2C users after installed base benefits.
                        </p>
                    </span>
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
