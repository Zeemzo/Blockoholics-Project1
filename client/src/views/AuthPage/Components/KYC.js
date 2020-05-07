import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Id from "@material-ui/icons/Email";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { addKyc } from "services/UserManagement";
import ImageUploader from "react-images-upload";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import CustomInputSelect from "components/CustomInputSelect/CustomInputSelect.js";

const useStyles = makeStyles(styles);

function KYCPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [id, setId] = useState("");
  const [dob, setDob] = useState(new Date());
  const [idFront, setIdFront] = useState("")
  const [idBack, setIdBack] = useState("")
  const [faceIdFront, setFaceIdFront] = useState("")
  const [fullname, setFullname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");


  const [loading, setLoading] = useState(false);

  const [idError, setIdError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [idFrontError, setIdFrontError] = useState(false)
  const [idBackError, setIdBackError] = useState(false)
  const [faceIdFrontError, setFaceIdFrontError] = useState(false)
  const [fullnameError, setFullnameError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [addressLineOneError, setAddressLineOneError] = useState(false);
  const [addressLineTwoError, setAddressLineTwoError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [countryError, setCountryError] = useState(false);


  const classes = useStyles();

  const { ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();


  const idFrontDrop = (picture) => {
    if (picture.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setIdFront(reader.result)
        setIdFrontError(false);
      });
      reader.readAsDataURL(picture[0]);
    } else {
      setIdFront("")
      setIdFrontError(true);
    }


  }

  const idBackDrop = (picture) => {
    if (picture.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setIdBack(reader.result)
        setIdBackError(false);

      }
      );
      reader.readAsDataURL(picture[0]);
    } else {
      setIdBack("")
      setIdBackError(true);

    }

  }

  const faceIdFrontDrop = (picture) => {
    if (picture.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setFaceIdFront(reader.result)
        setFaceIdFrontError(false);

      }
      );
      reader.readAsDataURL(picture[0]);
    } else {
      setFaceIdFront("")
      setFaceIdFrontError(true);

    }
  }
  const KYC = async (event) => {
    event.preventDefault()

    //required check
    setIdError(id == "" ? true : false);
    setDobError(dob > new Date() || dob == new Date() ? true : false)
    setIdFrontError(idFront == "" ? true : false);
    setIdBackError(idBack == "" ? true : false);
    setFaceIdFrontError(faceIdFront == "" ? true : false);
    setFullnameError(fullname == "" ? true : false);
    setTelephoneError(telephone == "" ? true : false);
    setAddressLineOneError(addressLineOne == "" ? true : false);
    setCityError(city == "" ? true : false);
    setProvinceError(province == "" ? true : false);
    setZipCodeError(zipCode == "" ? true : false);
    setCountryError(country == "" ? true : false);

    if (id != "" && idFront != "" && idBack != "" && faceIdFront != "" && fullname != "" && telephone != ""
      && addressLineOne != "" && city != "" && province != "" && zipCode != "" && country != "") {
      setLoading(true)

      const response = await addKyc({
        idNo: id,
        dob: dob,
        idFront: idFront,
        idBack: idBack,
        faceIdFront: faceIdFront,
        fullname: fullname,
        telephone: telephone,
        addressLineOne: addressLineOne,
        addressLineTwo: addressLineTwo,
        city: city,
        province: province,
        zipCode: zipCode,
        country: country,
      })
      switch (response) {
        case 200: enqueueSnackbar("Submitted for Approval", { variant: "success" });
          if (!props.kycAlone) {
            props.setStep("BLOCKCHAIN");
          }
           else {
            props.history.push(props.previousRoute);
          }
          ; break;
        case 201: enqueueSnackbar("Kyc is Already Approved", { variant: "warning" }); break;
        case 202: enqueueSnackbar("Kyc is Pending Approval", { variant: "warning" }); break;
        case 203: enqueueSnackbar("Kyc Submission Failed", { variant: "error" }); break;
        case null: enqueueSnackbar("Kyc Submission Failed", { variant: "error" });
      }
      setLoading(false)
    }
  };

  return (

    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form} style={loading ? {
              filter: "blur(1px)",
              "-webkit-filter": "blur(1px)"
            } : null} onSubmit={KYC}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h3>Know Your Consumer</h3>
              </CardHeader>
              <p className={classes.divider}>Help us understand your role better</p>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      error={idError}
                      labelText="Identity Number*"
                      id="idNo"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentityIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setId(e.target.value)
                          setIdError(e.target.value == "" ? true : false)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      error={fullnameError}
                      labelText="Full Name *"
                      id="fullname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <FaceIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setFullname(e.target.value)
                          setFullnameError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      error={telephoneError}
                      labelText="Phone Number *"
                      id="telephone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setTelephone(e.target.value)
                          setTelephoneError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={6} >

                    <MuiPickersUtilsProvider utils={DateFnsUtils}
                      style={dobError ? { "box-shadow": "0 6px 10px 0 red, 0 6px 20px 0 red" } : null}
                    >
                      <KeyboardDatePicker
                        style={dobError ? { "box-shadow": "0 6px 10px 0 red, 0 6px 20px 0 red" } : null}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of Birth *"
                        format="MM/dd/yyyy"
                        value={dob}
                        onChange={(date) => {
                          setDob(date);
                          setDobError(date > new Date() || date == new Date() ? true : false)
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      /></MuiPickersUtilsProvider>

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} lg={3}>
                    <InputLabel>ID Card Front Side *</InputLabel>
                    <ImageUploader
                      style={idFrontError ? { "box-shadow": "0 6px 10px 0 red, 0 6px 20px 0 red" } : null}
                      className="title"
                      withIcon={true}
                      singleImage={true}
                      label={idFront != "" ? "ID Card Front Side Selected" : "ID Card Front Side Not Selected"}
                      buttonText="Select Image *"
                      onChange={idFrontDrop}
                      imgExtension={[".jpg", ".gif", ".png"]}
                      maxFileSize={2000000}
                      withPreview={true}
                      fileSizeError={"Exceeds max size of 2 mb"}
                      fileTypeError={"Is not of type JPG, PNG or GIF"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={3}>
                    <InputLabel>ID Card Back Side *</InputLabel>
                    <ImageUploader
                      style={idBackError ? { "box-shadow": "0 6px 10px 0 red, 0 6px 20px 0 red" } : null}
                      className="title"
                      withIcon={true}
                      singleImage={true}
                      label={idBack != "" ? "ID Card Back Side Selected" : "ID Card Back Side Not Selected"}
                      buttonText="Select Image *"
                      onChange={idBackDrop}
                      imgExtension={[".jpg", ".gif", ".png"]}
                      maxFileSize={2000000}
                      withPreview={true}
                      fileSizeError={"Exceeds max size of 2 mb"}
                      fileTypeError={"Is not of type JPG, PNG or GIF"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={3}>
                    <InputLabel>Selfie Holding ID Card*</InputLabel>
                    <ImageUploader
                      style={faceIdFrontError ? { "box-shadow": "0 6px 10px 0 red, 0 6px 20px 0 red" } : null}
                      className="title"
                      withIcon={true}
                      singleImage={true}
                      label={faceIdFront != "" ? "Face Id Selected" : "Face Id Not Selected"}
                      buttonText="Select Image *"
                      onChange={faceIdFrontDrop}
                      imgExtension={[".jpg", ".gif", ".png"]}
                      maxFileSize={2000000}
                      withPreview={true}
                      fileSizeError={"Exceeds max size of 2 mb"}
                      fileTypeError={"Is not of type JPG, PNG or GIF"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInputSelect
                      error={countryError}
                      options={<Select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value)
                          setCountryError(e.target.value == "" ? true : false)
                        }}
                        displayEmpty
                        className={classes.selectEmpty}>
                        <MenuItem value="">
                          <em>Choose Your Country</em>
                        </MenuItem>
                        <MenuItem value={"SL"}>Sri Lanka</MenuItem>
                      </Select>}
                      labelText="Country *"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}

                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PublicIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true
                      }} />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      error={addressLineOneError}
                      labelText="Address Line One *"
                      id="addressLineOne"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <HomeIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setAddressLineOne(e.target.value)
                          setAddressLineOneError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      // error={addressLineTwoError}
                      labelText="Address Line Two"
                      id="addressLineTwo"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <HomeIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setAddressLineTwo(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={4}>
                    <CustomInput
                      error={cityError}
                      labelText="City *"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationCityIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setCity(e.target.value)
                          setCityError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={4}>
                    <CustomInput
                      error={provinceError}
                      labelText="Province *"
                      id="province"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <FilterHdrIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setProvince(e.target.value)
                          setProvinceError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem><GridItem xs={12} sm={12} md={6} lg={4}>
                    <CustomInput
                      error={zipCodeError}
                      labelText="Zip Code *"
                      id="zipCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocalPostOfficeIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ), required: true,
                        onChange: function (e) {
                          setZipCode(e.target.value)
                          setZipCodeError(e.target.value == "" ? true : false)

                        }
                      }}
                    />
                  </GridItem>

                </GridContainer>

                {loading && <LinearProgress />}
              </CardBody>

              <CardFooter className={classes.cardFooter}>
                {props.kycAlone ? null : <Button color="primary" size="lg" onClick={() => {
                  props.setStep("BLOCKCHAIN")
                }}>
                  Skip </Button>}
                  <Button color="primary" size="lg" type={"submit"} disabled={loading} onClick={KYC}>
                    Proceed </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>

  );
}

export default KYCPage