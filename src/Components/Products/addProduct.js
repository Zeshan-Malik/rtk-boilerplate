import React, { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../Config/theme";
import DTTextField from "../../Shared-Components/DTTextField";
import DSASecondaryBTN from "../../Shared-Components/DSASecondaryIconButton";
import DSAPrimaryButton from "../../Shared-Components/DSAPrimaryButton";
import DTModal from "../../Shared-Components/DSAModal";
import MenuItem from "@mui/material/MenuItem";
import DSASelect from "../../Shared-Components/DSASelect";
import messageIcon from "../../Assets/Images/messageIcon.svg";
import locationWhiteIcon from "../../Assets/Images/locationWhiteIcon.svg";
import DSACustomizedCheckbox from "../../Shared-Components/DSACheckBox";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const AddNewProduct = (props) => {
  const dispatch = useDispatch();

  const [timeVal, setTimeVal] = useState({
    pref_power_sleep: "18:00",
    pref_power_wake_up: "21:00",
    pref_reboot_time: "3:00",
  });
  // map states

  const [licenseCode, setLicenseCode] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [playlist, setPlayList] = useState([]);
  const [startupContent, setStartupContent] = useState("Playlist");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState("");
  const [productName, setProductName] = useState("");

  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [error_type, errorType] = useState("");
 

  // get text added in textarea
  const handleAddMessage = () => {
    const val = document.getElementById("text-area").value;
    // setTextAreaVal(val);
  };
  // method to restrict user to enter only numbers in location code
  const getNumbers = (e) => {
    var letters = /^[0-9]+$/;
    if (e.length && e.match(letters)) {
      setModal(e);
    } else if (!e.length) {
      setModal("");
    }
  };

  // Method to append text in text area of configure email modal
  const appendText = (text) => {
    let element = document.getElementById("text-area");
    element.value = element.value + text;
  };


  const productsTypeArray = ['Car', 'Bike', 'Jeep', 'Truck']
  // to add new location
  const handleToasts = (message) => {
    errorMsg(message);
    errorType("error");
    setOpenToast(true);
  };
  // method to validate emails
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  // location values validation
  const handleValidation = () => {
    if (!licenseId) {
      handleToasts("License code is Required");
    } else if (!modal) {
      handleToasts("Location code is Required");
    } else if (!productName.length) {
      handleToasts("Location name is Required");
    } else if (email.length && !validateEmail(email)) {
      handleToasts('Email field should be an e-mail address in the format "user@example.com"');
    } else {
      saveLocation();
    }
  };
  // method to save locations
  const saveLocation = async () => {
  
  };

  const CustomSpan = styled("span")(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.primary.labelColor,
  }));
  // props.addLocation

  let modalYear = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990]
  return (
    <>
      <DTModal
        // hideModalActionBtn
        leftbtn={'Hello'}
        rightbtn={'World'}
        exectueRequest={saveLocation}
        open={true}
        dialogStateHandle={props.setAddLocation}
        heading={"Add Product"}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "30vw",
            width: "30vw",
            maxHeight: "60vh !important",
            height: "60vh !important",
            padding: "0px 30px 0px 30px",
          },
        }}
      >
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={() => setOpenToast(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            top: "18vh !important",
          }}
        >
          <Alert severity={error_type} sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
        <Grid container display={"flex"} flexDirection={"column"} mt={-4}>
          <Grid
            item
            xs={12}
            spacing={2}
          >
          <DTTextField
            label={"Product Name"}
            sx={{ marginTop: "15px", fontSize: "14" }}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
            <Grid>
              <Box mt={1.2}>
                <CustomSpan
                  sx={{
                    color: "#5d953c",
                  }}
                >
                  Product Type
                </CustomSpan>
                <DSASelect
                  value={licenseId}
                  onChange={(e) => setLicenseId(e.target.value)}
                >
                  {productsTypeArray?.map((m) => {
                    return (
                      <MenuItem
                        value={m}
                      >{m} </MenuItem>
                    );
                  })}
                </DSASelect>
              </Box>
            </Grid>

            <Grid>
              <Box mt={1.2}>
                <CustomSpan
                  sx={{
                    color: "#5d953c",
                  }}
                >
                  Product Type
                </CustomSpan>
                <DSASelect
                  value={licenseId}
                  onChange={(e) => setLicenseId(e.target.value)}
                >
                  {modalYear?.map((m) => {
                    return (
                      <MenuItem
                        value={m}
                      >{m} </MenuItem>
                    );
                  })}
                </DSASelect>
              </Box>
            </Grid>
            <Grid> 
            <DTTextField
            label={"Product Price"}
            sx={{ marginTop: "15px", fontSize: "14" }}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
            </Grid>
             <Grid>
              <DTTextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Email"}
                sx={{ fontSize: "14" }}
              />
            </Grid>
            <Grid>
              <DTTextField
                label={"Contact Name"}
                sx={{ fontSize: "14" }}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </DTModal>
    </>
  );
};

export default AddNewProduct;
