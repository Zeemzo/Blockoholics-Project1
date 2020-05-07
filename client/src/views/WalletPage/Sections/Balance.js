import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getWalletBalance } from "services/UserManagement.js";

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import RedeemIcon from '@material-ui/icons/Redeem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import DetailsExpansions from "views/WalletPage/Sections/Components/DetailsExpansions.js"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Balance(props) {
  const [balanceArray, setBalanceArray] = useState(null)

  const classes = useStyles();
  useEffect(() => {
    async function fetch() {
      const balance = await getWalletBalance(props.publicKey)
      if (balance != null) {
        
        setBalanceArray(balance)
      }
    }
    fetch()

  }, []);

  return (

    <Card>
      <CardHeader color="primary" className={classes.cardHeader}>
        <h4>Balance</h4>
      </CardHeader>
      <CardBody>
        <List className={classes.root}>

          {balanceArray && balanceArray.length > 0 && (
            balanceArray.map((item1, index) => (
              <>
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      {item1.assetCode ? <FavoriteIcon /> : "XLM"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item1.assetCode ? item1.assetCode : "XLM"} secondary={item1.balance+" coins"} />
                  <ListItemSecondaryAction>
                    <Button><ShoppingCartIcon />Buy</Button>
                    <Button><RedeemIcon />Redeem</Button>

                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
              // <div key={index}><Typography noWrap gutterBottom variant="body1" component="p">
              //   {item1.assetCode ? item1.assetCode : "XLM"} TOKEN: <Badge >{item1.balance}</Badge>
              // </Typography> </div>
            ))
          )}
        </List>

        {/* <DetailsExpansions name="Name" value="Azeem" disabled />
          <DetailsExpansions name="Age" value="Azeem" />
          <DetailsExpansions name="DOB" value="Azeem" /> */}
      </CardBody>
    </Card >
  );
}
