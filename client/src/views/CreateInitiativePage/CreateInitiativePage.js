import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import CustomInputSelect from "components/CustomInputSelect/CustomInputSelect.js";
import Select from '@material-ui/core/Select';
import CustomSearchSelect from "components/CustomSearchSelect/CustomSearchSelect.js";
// import { SingleSelect } from "react-select-material-ui";

// @material-ui/icons
// import People from "@material-ui/icons/People";
// import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { withRouter } from "react-router-dom";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import withAuthorization from "components/Authentication/Index.js";
import sidebar from "assets/img/sidebar.png";
import HeaderLinks from "components/Header/HeaderLinks.js";
// import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import classNames from "classnames";
import ImageUploader from "react-images-upload";
import image from "assets/img/covers/comotion.jpg";
// import imageToBase64 from "image-to-base64";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { addInitiative } from "services/KnowledgeManagement.js";
import { SearchOrGetAccounts, getUserSession } from "services/UserManagement.js";

import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);
const data = [{ label: 'Retrieving Users ...', value: '' }]

function CreateInitiativePage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const [currentUser, setCurrentUser] = useState(getUserSession())

    const [open, setOpen] = React.useState(false);

    const [cover, setCover] = useState("")
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [goal, setGoal] = useState(0);
    const [description, setDescription] = useState("");
    const [recipientType, setRecipientType] = useState("");
    const [recipient, setRecipient] = useState("");
    const [options, setOptions] = useState(data)

    const [loading, setLoading] = useState(false);

    const [coverError, setCoverError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [goalError, setGoalError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [recipientTypeError, setRecipientTypeError] = useState(false);
    const [recipientError, setRecipientError] = useState(false);


    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const searchUser = async (key) => {
        const response = await SearchOrGetAccounts(key);
        if (response != null) {
            const OptionsArray = []
            response.forEach((item) => {
                console.log(item)
                OptionsArray.push(
                    { label: item.alias + " - " + item.publicKey.substring(0, 20) + " ...", value: item.publicKey }
                )
            })
            setOptions(OptionsArray)
        }
    }

    const onDrop = (picture) => {
        if (picture.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setCover(reader.result)
            );
            reader.readAsDataURL(picture[0]);
        } else {
            setCover("")
        }

    }

    const CreateInitiative = async (event) => {
        event.preventDefault()

        //required check
        setCoverError(cover == "" ? true : false);
        setNameError(name == "" ? true : false);
        setGoalError(goal < 10 || goal == "" ? true : false);
        setDescriptionError(description == "" ? true : false);
        setRecipientTypeError(recipientType == "" ? true : false);
        setRecipientError(recipient == "" ? true : false);

        // }
        if (cover != ""
            && name != "" && goal != "" && description != "" && recipientType != "" && recipient != "") {
            setLoading(true)

            const response = await addInitiative({
                cover, name, goal, description, endDate: selectedDate, recipientType, recipient
            })
            if (response != null) {
                switch (response.status) {
                    case 200: enqueueSnackbar("Initiative Created Successfully", { variant: "success" });
                        props.history.push('/initiative/' + response.data.data._id); break;
                    case 202: enqueueSnackbar("Kyc Approval Pending", { variant: "warning" }); break;
                    case 203: enqueueSnackbar("You can only create one initiative at a time", { variant: "warning" }); break;
                    case 201: enqueueSnackbar("Initiative Creation Failed", { variant: "error" }); break;
                    case null: enqueueSnackbar("Initiative Creation Failed", { variant: "error" });

                }
            }

            setLoading(false)
        }

    };

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
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                                <Card>
                                    <form className={classes.form} onSubmit={CreateInitiative} style={loading ? {
                                        filter: "blur(1px)",
                                        "-webkit-filter": "blur(1px)"
                                    } : null} >
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>Create Initiative</h4>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4} lg={3}>
                                                    <ImageUploader className="title"
                                                        withIcon={true}
                                                        singleImage={true}
                                                        label={cover != "" ? "Cover Selected" : "Cover Not Selected"}
                                                        buttonText="Select A Cover *"
                                                        onChange={onDrop}
                                                        imgExtension={[".jpg", ".gif", ".png"]}
                                                        maxFileSize={2000000}
                                                        withPreview={true}
                                                        fileSizeError={"Exceeds max size of 2 mb"}
                                                        fileTypeError={"Is not of type JPG, PNG or GIF"}
                                                    />

                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={8} lg={9}>
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={12} md={8} lg={8}>
                                                            <CustomInput
                                                                error={nameError}
                                                                labelText="Initiative Name *"
                                                                id="name"
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                    type: "text", required: true,
                                                                    onChange: function (e) {
                                                                        setName(e.target.value)
                                                                        setNameError(e.target.value == "" ? true : false);

                                                                    }
                                                                }}
                                                            />
                                                        </GridItem>



                                                        <GridItem xs={12} sm={12} md={6} lg={6}>
                                                            <CustomInput
                                                                error={goalError}
                                                                labelText="Goal *"
                                                                id="goal"
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                    type: "number",
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <AttachMoneyIcon className={classes.inputIconsColor} />
                                                                        </InputAdornment>
                                                                    ), required: true, placeholder: "10 and above",
                                                                    onChange: function (e) {
                                                                        setGoal(e.target.value)

                                                                        setGoalError(e.target.value < 10 || e.target.value == "" ? true : false);

                                                                    }
                                                                }}
                                                            />
                                                        </GridItem>

                                                        <GridItem xs={12} sm={12} md={4} lg={4}>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    label="End Date *"
                                                                    format="MM/dd/yyyy"
                                                                    value={selectedDate}
                                                                    onChange={(date) => {
                                                                        setSelectedDate(date);
                                                                    }}
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date',
                                                                    }}
                                                                /></MuiPickersUtilsProvider>
                                                        </GridItem>

                                                        <GridItem xs={12} sm={12} md={6} lg={6}>
                                                            <CustomInputSelect

                                                                error={recipientTypeError}
                                                                options={<Select
                                                                    value={recipientType}
                                                                    onChange={(e) => {
                                                                        if (e.target.value == "Single") {
                                                                            searchUser("")
                                                                            setOpen(true)
                                                                        }

                                                                        if (e.target.value == "Multiple") {
                                                                            setRecipient(currentUser.publicKey)
                                                                        }

                                                                        setRecipientType(e.target.value)

                                                                        setRecipientTypeError(e.target.value == "" ? true : false);

                                                                    }}
                                                                    displayEmpty
                                                                    className={classes.selectEmpty}
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>Choose Recipient Type</em>
                                                                    </MenuItem>
                                                                    <MenuItem value={"Single"}>Single</MenuItem>
                                                                    <MenuItem value={"Multiple"}>Multiple</MenuItem>
                                                                </Select>}
                                                                labelText="Recipient Type *"
                                                                id="type"
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                            />
                                                        </GridItem>
                                                        {recipientType != "" && recipientType == "Single" &&
                                                            // <GridItem xs={12} sm={12} md={4} lg={4}>
                                                            <CustomSearchSelect
                                                                handleClose={handleClose}
                                                                open={open}
                                                                value={recipient}
                                                                options={options}
                                                                placeholder={"Search by Alias or Public Key"}
                                                                onChange={(e) => {
                                                                    //console.log(e)
                                                                    setRecipient(e)

                                                                    setRecipientError(e == "" ? true : false);
                                                                }}
                                                            />

                                                            // </GridItem>
                                                        }
                                                        {recipientType != "" &&
                                                            <GridItem xs={12} sm={12} md={6} lg={6} onClick={() => {
                                                                setOpen(true)
                                                            }}>
                                                                <CustomInput
                                                                    error={recipientError}
                                                                    labelText="Recipient *"
                                                                    id="recipient"
                                                                    formControlProps={{
                                                                        fullWidth: true
                                                                    }}
                                                                    inputProps={{
                                                                        type: "text",
                                                                        required: true, disabled: true, value: recipientType == "Multiple" ? "Initiator: " + recipient : recipient
                                                                    }}
                                                                />

                                                            </GridItem>
                                                        }
                                                        <GridItem xs={12} sm={12} md={12} lg={12}>
                                                            <CustomInput
                                                                error={descriptionError}
                                                                labelText="Description *"
                                                                id="goal"
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    multiline: true,
                                                                    rows: "2", required: true,
                                                                    onChange: function (e) {
                                                                        setDescription(e.target.value)

                                                                        setDescriptionError(e.target.value == "" ? true : false);

                                                                    }
                                                                }}
                                                            />
                                                        </GridItem>

                                                    </GridContainer>

                                                </GridItem>
                                            </GridContainer>
                                            {loading && <LinearProgress />}
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button simple color="primary" size="lg" type={"submit"} onClick={CreateInitiative} disabled={loading}>
                                                Create Initiative</Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />

        </div >



    );
}


const authCondition = authUser => !!authUser && authUser.verified;

export default withAuthorization(authCondition)(withRouter(CreateInitiativePage));