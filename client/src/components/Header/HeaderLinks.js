/*eslint-disable*/
import React, { useEffect, useState } from "react";
// react components for routing our app without refresh
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Home } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import { getUserSession } from "services/UserManagement.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserSession();
    setUser(user)
  }, []);
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.navLink}
          onClick={e => e.preventDefault()}
          color="transparent" onClick={() => {
            props.history.push("/")
          }}
        ><Home className={classes.icons} />
          Home</Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => {
            props.history.push("/initiatives")
          }} className={classes.navLink}
          color="transparent"
        >Initiatives</Button>
      </ListItem>
      {user && user.verified ?
        <ListItem className={classes.listItem}>
          <Button
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent" onClick={() => {
              props.history.push("/createInitiative")
            }}
          ><AddIcon className={classes.icons} />
          Create Initiative</Button>
        </ListItem>
        : null}
      {user ?
        <ListItem className={classes.listItem}>
          <CustomDropdown
            right
            caret={true}
            // hoverColor="black"
            // dropdownHeader={user.alias}
            buttonText={
              user.alias
            }
            buttonProps={{
              className:
                classes.navLink + " " + classes.imageDropdownButton,
              color: "transparent"
            }}
            dropdownList={[
              <h6
                onClick={() => {
                  props.history.push("/profile/" + user.publicKey)
                }} className={classes.navLink}
              >Profile
                  </h6>
              ,
              <span
                onClick={() => {
                  props.history.push("/wallet/" + user.publicKey)
                }} className={classes.navLink}
              >Wallet
                  </span>,
              <span
                onClick={() => {
                  localStorage.removeItem("token")
                  props.history.push("/auth")
                }} className={classes.navLink}
              >Logout
                    </span>
            ]}
          />
        </ListItem> : <ListItem className={classes.listItem}>
          <Button
            className={classes.registerNavLink}
            onClick={e => e.preventDefault()}
            color="primary"
            round onClick={() => {
              props.history.push("/auth")
            }}
          >
            Login
                  </Button>
        </ListItem>
      }
    </List >
  );
}

export default withRouter(HeaderLinks);