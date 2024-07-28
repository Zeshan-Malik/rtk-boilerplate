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
import {createNewProduct} from './productsSlice'
const AddNewProduct = (props) => {
  const dispatch = useDispatch();

  const [timeVal, setTimeVal] = useState({
    pref_power_sleep: "18:00",
    pref_power_wake_up: "21:00",
    pref_reboot_time: "3:00",
  });
  // map states

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCompanyName, setProductCompanyName] = useState('');
  const [productColor, setProductColor] = useState("");
  const [productType, setProductType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState("")
  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [error_type, errorType] = useState("");
 
  const productsTypeArray = ['Car', 'Bike', 'Jeep', 'Truck']
  // to add new location
  const handleToasts = (message) => {
    errorMsg(message);
    errorType("error");
    setOpenToast(true);
  };
  
  // location values validation
  const handleValidation = () => {
    if (!productType.length) {
      handleToasts("License code is Required");
    } else if (!modal.length) {
      handleToasts("Location code is Required");
    } else if (!productName.length) {
      handleToasts("Location name is Required");
    } else if (!productColor.length) {
      handleToasts("Location name is Required");
    } else if (!imageUrl.length) {
      handleToasts("Location name is Required");
    }else if (!modal.length) {
      handleToasts("Location name is Required");
    }else if (!productCompanyName.length) {
      handleToasts("Location name is Required");
    }else {
      saveProductToDB();
    }
  };
  // method to save locations
  const saveProductToDB = async () => {
    const payload ={
      name:productName,
      price:productPrice,
      company:productCompanyName,
      color:productColor,
      productType:productType,
      image:imageUrl,
      description:description,
      available:(status ==='Available' ? true:false),
      productModal:modal}

      const resp = await dispatch(createNewProduct(payload))

      props.setOpenAddModal(false);
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
        leftbtn={'Cancel'}
        rightbtn={'Save'}
        exectueRequest={saveProductToDB}
        open={props.openAddModal}
        resetFieldsCall = {false} 
        dialogStateHandle={props.setOpenAddModal}
        heading={"Add Product"}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "30vw",
            width: "30vw",
            maxHeight: "81vh !important",
            height: "81vh !important",
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
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
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
                  Product Modal
                </CustomSpan>
                <DSASelect
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
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
            label={"Vechical Company Name"}
            sx={{ marginTop: "15px", fontSize: "14" }}
            value={productCompanyName}
            onChange={(e) => setProductCompanyName(e.target.value)}
          />
            </Grid>
            <Grid> 
            <DTTextField
            label={"Vechical Color"}
            sx={{ marginTop: "15px", fontSize: "14" }}
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
          />
            </Grid>
            <Grid> 
            <DTTextField
            label={"Product Price"}
            sx={{ marginTop: "15px", fontSize: "14" }}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
            </Grid>
             <Grid>
              <DTTextField
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                label={"Paste Image Url"}
                sx={{ fontSize: "14" }}
              />
            </Grid>
            <Grid>
              <Box mt={1.2}>
                <CustomSpan
                  sx={{
                    color: "#5d953c",
                  }}
                >
                  Availability Status
                </CustomSpan>
                <DSASelect
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {['Availble', 'Not Available']?.map((m) => {
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
          <Typography
            mt={2}
            mb={1}
            variant="subtitle2"
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.pageHeadingColor,
            }}
          >
            Description
          </Typography>
          <textarea
            className="compose-email"
            id="text-area"
            onChange = {(e) => setDescription(e.target.value)}
            placeholder="Enter description here..."
          />
        </Grid>
          </Grid>
        </Grid>
      </DTModal>
    </>
  );
};

export default AddNewProduct;
