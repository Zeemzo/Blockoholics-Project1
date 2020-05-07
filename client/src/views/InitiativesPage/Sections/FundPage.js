import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import { Keypair } from "stellar-sdk";
import sha256 from "sha256";

// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TransferFund, getUserSession } from "services/UserManagement.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// core components
import CreditCardIcon from '@material-ui/icons/CreditCard';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import VpnKeyIcon from '@material-ui/icons/VpnKey';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import CardFooter from "components/Card/CardFooter.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AES, enc } from "crypto-js";

const useStyles = makeStyles(styles);

function decryptSecret(secret, signer) {
    try {
        const decrypted = AES.decrypt(secret, signer);
        const plaintext = decrypted.toString(enc.Utf8);
        return plaintext;
    } catch (error) {
        return null;
    }
}
export default function FundPage(props) {
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState(getUserSession())

    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCVC] = useState("");


    const [passwordError, setPasswordError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [expiryError, setExpiryError] = useState(false);
    const [cvcError, setCVCError] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const [loading1, setLoading1] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const Pay = async (e) => {
        e.preventDefault()

        var ra = /^\d*\.?\d*$/;
        setPasswordError(password == "" ? true : false);
        setAmountError(amount == "" || !ra.test(amount) ? true : false);

        if (amount != ""
            && password != "") {
            handleClickOpen()
        }
    }
    const FundAccount = async (e) => {
        e.preventDefault()

        var ra = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        setCardNumberError(cardNumber == "" || !ra.test(cardNumber) ? true : false);

        var rce = /^((0[1-9])|(1[0-2]))[\/\.\-]*((2[0-9])|(3[0-9]))$/
        setExpiryError(expiry == "" || !rce.test(expiry) ? true : false);


        var rcvc = /^\d\d\d$/
        setCVCError(cvc == "" || !rcvc.test(cvc) ? true : false);

        if (cardNumber != ""
            && expiry != "" && cvc != "") {
            handleClose()
            setLoading1(true)


            let pass = password
            if (user.authType != 2) {
                //console.log(password)
                //console.log(user.encryptedSecret)
                //console.log(sha256(password))
                //console.log(pass)

                pass = decryptSecret(user.encryptedSecret, sha256(password));
                //console.log(pass)

            }
            let keypair = Keypair.fromSecret(pass)
            // //console.log(keypair.publicKey())

            const response = await TransferFund(props.Initiative.recipient, amount, keypair, user.alias, props.coin)
            switch (response) {
                case 200: enqueueSnackbar("Funded Successfully", { variant: "success" });
                    setPassword("")
                    setAmount(""); break;
                case 201: enqueueSnackbar("Account Not Found", { variant: "warning" });break;
                case 202: enqueueSnackbar("You cannot fund yourself", { variant: "warning" });break;
                case 203: enqueueSnackbar("Blockchain Transaction Failed", { variant: "error" }); break;
                case null: enqueueSnackbar("Funding Failed", { variant: "error" });
            }
            setLoading1(false)


        };
    }

    return (
        <Card><form className={classes.form} onSubmit={Pay} style={loading1 ? {
            filter: "blur(1px)",
            "-webkit-filter": "blur(1px)"
        } : null} >
            {/* <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Fund Initiative</h4>
            </CardHeader> */}
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                                <Typography align="right" variant="overline" component="h2">
                                    1 {props.coin} = {props.rate} Dollars
                              </Typography>
                                {amount != "" && <Typography align="right" variant="overline" component="h2">
                                    Total  = {parseInt(amount) * props.rate} Dollars
                              </Typography>}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} lg={6}>

                                <CustomInput
                                    error={amountError}
                                    labelText="Amount *"
                                    id="amount"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AttachMoneyIcon className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        ), required: true, value: amount,
                                        onChange: function (e) {
                                            var ra = /^\d*\.?\d*$/;
                                            setAmountError(e.target.value == "" || !ra.test(e.target.value) ? true : false);
                                            setAmount(e.target.value)
                                        }
                                    }}
                                />
                            </GridItem>


                            <GridItem xs={12} sm={12} md={6} lg={6}>
                                <CustomInput
                                    error={passwordError}
                                    labelText={user.authType == 2 ? "Secret Key *" : "Password *"}
                                    id="secret"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "password", endAdornment: (
                                            <InputAdornment position="end">
                                                <VpnKeyIcon className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        ), required: true, value: password,
                                        onChange: function (e) {
                                            setPasswordError(e.target.value == "" ? true : false);
                                            setPassword(e.target.value)
                                        }
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

                    </GridItem>
                </GridContainer>
                {loading1 && <LinearProgress />}
            </CardBody>
            <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" type={"submit"} onClick={Pay} disabled={loading1}>
                    Fund Initiative</Button>
                {/* <Button simple color="primary" size="lg" type={"submit"} onClick={FundAccount}>
                    Fund Initiative</Button> */}
            </CardFooter>
        </form>

            <Dialog
                maxWidth="md"
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                scroll={"body"}
            >
                <DialogTitle id="responsive-dialog-title">{"Payment Details"}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12}>

                                <CustomInput

                                    error={cardNumberError}
                                    labelText="Card Number *"
                                    id="cardNumber"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CreditCardIcon className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        ), required: true, for: "cardNumber",
                                        onChange: function (e) {
                                            var ra = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
                                            setCardNumberError(e.target.value == "" || !ra.test(e.target.value) ? true : false);
                                            setCardNumber(e.target.value)
                                        }
                                    }}
                                />
                            </GridItem>


                            <GridItem xs={6} sm={6} md={6} lg={6}>
                                <CustomInput
                                    error={expiryError}
                                    labelText="Expiration Date"
                                    id="cardExpiry"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text", required: true, for: "cardExpiry", placeholder: "MM/YY",
                                        onChange: function (e) {
                                            var rce = /^((0[1-9])|(1[0-2]))[\/\.\-]*((2[0-9])|(3[0-9]))$/
                                            setExpiryError(e.target.value == "" || !rce.test(e.target.value) ? true : false);
                                            setExpiry(e.target.value)
                                        }
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={6} sm={6} md={6} lg={6}>
                                <CustomInput
                                    error={cvcError}
                                    labelText="CVC"
                                    id="cardCVC"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text", required: true, for: "cardCVC", placeholder: "CVC",
                                        onChange: function (e) {
                                            var rce = /^\d\d\d$/
                                            setCVCError(e.target.value == "" || !rce.test(e.target.value) ? true : false);
                                            setCVC(e.target.value)
                                        }
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel Payment          </Button>
                    <Button onClick={FundAccount} color="primary" autoFocus>
                        Pay          </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
