import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Accordion,
  AccordionDetails,
  Divider,
} from "@mui/material";

import AddNewProduct from'./addProduct'
import theme from "../../Config/theme";
import DTTextField from "../../Shared-Components/DTTextField";
import DSASecondaryBTN from "../../Shared-Components/DSASecondaryIconButton";
import { CustomAccordionSummary } from "../../Shared-Components/Accordion";
import DeleteIconn from "@mui/icons-material/Delete";
import QuestionMark from "@mui/icons-material/QuestionMark";
import DSAPrimaryButton from "../../Shared-Components/DSAPrimaryButton";
import DSAEnhancedTable from "../../Shared-Components/DSAEnhancedTable";
import DTModal from "../../Shared-Components/DSAModal";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Error from "../../Assets/Images/Error.svg";
import { ReactComponent as ReferenceIcon } from "../../Assets/Images/edit.svg";
import preview from "../../Assets/Images/preview.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ReactComponent as LikeIcon } from "../../Assets/Images/likeIcon.svg";
import { ReactComponent as PwdEmail } from "../../Assets/Images/passwordemail.svg";
import { ReactComponent as DeleteIcon } from "../../Assets/Images/delete.svg";
import DSAToolTip from "../../Shared-Components/DSAToolTip";
import { useDispatch } from "react-redux";
import DTSpinner from "../../Shared-Components/DTSpinner";
import * as yup from "yup";
import { Formik, Form } from "formik";
import DTEmailField from "../../Shared-Components/DTEmailField";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "./productsSlice";

const headerCells = [
  {
    id: "sr",
    numeric: false,
    disablePadding: false,
    label: "Sr",
    type: "text",
    align: "left",
    minWidth: "20px",
    show: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    type: "text",
    align: "left",
    minWidth: "100px",
    show: true,
  },
  {
    id: "company",
    numeric: false,
    disablePadding: false,
    label: "Company",
    type: "text",
    avatar: true,
    icon: true,
    align: "left",
    minWidth: "20px",
    show: true,
  },
  {
    id: "color",
    numeric: false,
    disablePadding: false,
    label: "Vehical Color",
    type: "text",
    avatar: true,
    icon: true,
    align: "left",
    minWidth: "20px",
    show: true,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    type: "text",
    avatar: false,
    align: "left",
    minWidth: "110px",
    show: true,
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price $",
    type: "text",
    avatar: false,
    icon: false,
    align: "left",
    minWidth: "20px",
    show: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    type: "text",
    avatar: true,
    icon: true,
    align: "left",
    minWidth: "20px",
    show: true,
  },

  {
    id: "thumbnail",
    numeric: false,
    disablePadding: false,
    label: "Preview",
    type: "text",
    avatar: true,
    align: "center",
    minWidth: "90px",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    type: "text",
    avatar: true,
    align: "left",
    minWidth: "150px",
    show: true,
  },
];

const ProductsList = () => {
  const [rowId, setRowId] = useState([]);
  const [headers] = useState(headerCells);
  const [deleteEntry, setDeleteEntry] = useState(false);
  const [suspendUser, setSuspendUser] = useState(false);
  const [addLocalUser, setAddLocalUser] = useState(false);
  const [editLocalUser, setEditUser] = useState(false);
  const [openPermisson, setOpenPermisson] = useState(false);
  const [LoadingState, setloadingState] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [productsList, setProductList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [error_type, errorType] = useState("");
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [permissonId, setPermissonId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [firstAcrodion, setFirstAcrodion] = useState(true);
  const [secondAcrodion, setSecondAcrodion] = useState(false);
  const [viewdetails, setviewdetails] = useState(false);
  const [itemPreview, setItemPreview] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProductsList = async () => {
    const resp = await dispatch(getAllProducts());

    if (resp) {
      setProductList(resp.payload.data);
    }
  };
  const tableData = productsList?.map((item, index) => {
    const data = {
      sr: index + 1,
      name: item.name,
      company: item.company,
      color: item.color,
      description: item.description,
      price: item?.price || 0,
      status: {
        icons: [
          {
            element: (
              <>
                <p
                  className={
                    item.available
                      ? "active-background"
                      : "suspended-background"
                  }
                >
                  {item.available ? "Available" : "Sold Out"}
                </p>
              </>
            ),
          },
        ],
        value: `${" "}`,
      },

      thumbnail: {
        value: `${" "}`,
        icons: [
          {
            element: (
              <>
                <img
                  src={item.image}
                  alt=""
                  style={{
                    borderRadius: "0px",
                    height: "60px",
                    width: "60px",
                    background: "#f3f3f3",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                  }}
                />
              </>
            ),
          },
        ],
      },

      action: {
        value: " ",
        icons: [
          {
            element: (
              <DSAToolTip placement="top" title={"Edit Product"}>
                <ReferenceIcon
                  onClick={() => {
                    setUser(item);
                    setEditUser(true);
                  }}
                />
              </DSAToolTip>
            ),
          },
          {
            element: (
              <DSAToolTip placement="top" title={"Like"}>
                <LikeIcon
                  onClick={() => {
                    setCurrentUser(item);
                  }}
                  style={{
                    marginLeft: "18px",
                  }}
                />
              </DSAToolTip>
            ),
          },
          {
            element: (
              <DSAToolTip placement="top" title={"View Product"}>
                <VisibilityIcon
                  onClick={() => {
                    console.log("_id", item._id);
                    getProductDetails(item._id);
                  }}
                  style={{
                    marginLeft: "18px",
                  }}
                />
              </DSAToolTip>
            ),
          },
          {
            element: (
              <DSAToolTip placement="top" title={"Delete Product"}>
                <DeleteIcon
                  onClick={() => {
                    setDeleteEntry(true);
                    setUserId(item.id);
                  }}
                  style={{
                    marginLeft: "18px",
                  }}
                />
              </DSAToolTip>
            ),
          },
        ],
      },
      id: item.id,
    };
    return data;
  });
  const handleRowId = (value) => {
    setRowId(value);
  };
  var test = [];
  tableData?.map((o) => {
    var temp = { ...o };
    Object.keys(temp).map((k) => {
      if (headers.find((h) => h.id === k)?.show === false) {
        return delete temp[k];
      }
    });
    test.push(temp);
    return o;
  });

  const [loading, setLoading] = useState(false);
  const handleCreateProduct = async (values) => {
    setLoading(true);
    const response = await dispatch(
      createNewProduct({ email: values.email, name: values.name })
    );
    if (response.payload.data.success) {
      setAddLocalUser(false);
      setSuccessModal(true);
      setLoading(false);
    } else {
      setLoading(false);
      setOpenToast(true);
      errorMsg(response.payload?.data.msg);
      errorType("error");
    }
  };

  // delete user
  const handleDeleteConfirm = async () => {
    let id = userId ? userId : rowId[0];
    const response = await dispatch(deleteProduct(id));
    if (response.payload) {
      setOpenToast(true);
      errorMsg("Local user removed successfully");
      setDeleteEntry(false);
      errorType("success");
      getAllProducts();
      setRowId([]);
    } else {
      setOpenToast(true);
      errorMsg(response.payload?.data.msg);
      errorType("error");
    }
  };

  const handleConfirm = async () => {
    if (selectedUser[0].status === "Active") {
      handleChangeStatus();
    }
  };

  // method to toggle accordians in modal
  const handleAccrodianToggle = (acr) => {
    if (acr === "1") {
      setSecondAcrodion(false);
      setFirstAcrodion(!firstAcrodion);
    } else {
      setSecondAcrodion(!secondAcrodion);
      setFirstAcrodion(false);
    }
  };

  const handleChangeStatus = async () => {
    const response = await dispatch(updateProduct(rowId[0]));
    if (response.payload.data.success) {
      setOpenToast(true);
      setSelectedUser([]);
      setRowId([]);
      errorMsg("User susspended successfully");
      errorType("success");
      setEditUser(false);
      getAllProducts();
    } else {
      setOpenToast(true);
      errorMsg(response.payload.data.msg);
      errorType("error");
    }
    setSuspendUser(false);
  };

  const ErrorSpace = styled("span")(({ theme }) => ({
    position: "relative",
    color: "red",
    fontWeight: 400,
    fontSize: "12px",
    fontFamily: "Poppins",
  }));

  const initialValues = {
    name: "",
    email: "",
  };
  const userInitialValues = {
    name: user.name,
    email: user.email,
  };
  let Schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
  });

  const CustomAccordion = styled((props) => <Accordion {...props} />)(
    ({ theme }) => ({
      background: `${theme.palette?.primary?.white}`,
      borderRadius: `${theme.shapes?.primaryBtnBorderRadius} !important`,
      marginBottom: "10px",
    })
  );

  const currentProduct = useRef([]);
  const currentProductDescription = useRef([]);
  const getProductDetails = async (id) => {
    let param = `?id=${id}`;
    const response = await dispatch(getProductById(param));
    if (response) {
      let tempData = response.payload.data.data;
      const abc = {
        Name: tempData.name,
        Company: tempData.company,
        Color: tempData.color,
        Model: tempData.model,
        Type:tempData.type,
        Price: (tempData.price || 0),
        ImageURL: tempData.image,
      };
      currentProductDescription.current = tempData.description;
      currentProduct.current = abc;
      setviewdetails(true);
    } else {
    }
  };

  return (
    <>
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
      <Grid
        container
        xs={12}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <DTSpinner open={LoadingState} />

        <Grid xs={12}>
          <Box
            className="testing-overflow"
            sx={{
              background: `${theme.palette.primary.white}`,
              borderRadius: `${theme.table.borderRadius}`,
              padding: "0px 10px 10px 14px",
              maxHeight: "67vh",
              marginLeft: "5px",
              minHeight: "60vh",
              height: "60vh",
              marginRight: "2vh",
            }}
          >
            <Grid
              container
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              pl={1}
              pr={1}
            >
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "14px", fontWeight: "500", color: "#818181" }}
                >
                  List of All Vehicals
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
              >
                <Grid
                  item
                  lg={8}
                  md={8}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: { md: "right", sm: "right", xs: "right" },
                    alignItems: "center",
                  }}
                >
                  <Stack
                    sx={{
                      mt: { md: 0, sm: 3, xs: 3 },
                      display: "flex",
                      alignItems: { md: "center", sm: "center" },
                      flexDirection: { md: "row", sm: "row", xs: "column" },
                      justifyContent: {
                        md: "center",
                        sm: "right",
                        xs: "right",
                      },
                      minWidth: "max-content",
                    }}
                  >
                    <DSAPrimaryButton
                      sx={{ marginRight: "-20px", padding: "8px 14px" }}
                      onClick={() => setAddLocalUser(true)}
                    >
                      <AddIcon
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: `${theme.shapes.primaryBtnFontSize}`,
                          marginLeft: "6px",
                        }}
                      >
                        Add Product
                      </Typography>
                    </DSAPrimaryButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ maxHeight: "50vh" }}>
              <DSAEnhancedTable
                rowsPage={100}
                minHeight="30vh"
                maxHeight="inherit"
                loading={LoadingState}
                cursor="pointer"
                hideSearch
                hidePagination
                hideToolbarButton
                rows={test ? test : []}
                headerCells={headerCells}
                isSetting={false}
                someFunctionHere={handleRowId}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <DTModal
        leftbtn={"No"}
        rightbtn={"Yes"}
        exectueRequest={handleDeleteConfirm}
        rightbtnbackgroundcolor={"#EC4C4C"}
        open={deleteEntry}
        dialogStateHandle={setDeleteEntry}
        heading
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "20vw",
            width: "20vw",
            padding: "10px 20px 0px 20px",
          },
        }}
      >
        <Grid container>
          <Grid item lg={12}>
            <DSAPrimaryButton
              sx={{
                background: `${theme.palette.primary.dangerLight}`,
                color: `#EC4C4C`,
                padding: "15px 10px !important",
                marginLeft: "2px",
                borderRadius: "50%",
                border: "1px solid #F6CACA ",
                minWidth: "53px",
                marginTop: "-4vh",
              }}
              icon={
                <DeleteIconn
                  sx={{
                    fontSize: "22px",
                    color: `${theme.palette.primary.dangerDark}`,
                  }}
                />
              }
            />
            <Typography
              sx={{
                marginLeft: "2px",
                fontWeight: "600",
                fontSize: "18px",
                marginTop: "1vh",
              }}
            >
              Are you sure you want to proceed?
            </Typography>
          </Grid>
        </Grid>
      </DTModal>
      <DTModal
        leftbtn={"No"}
        rightbtn={"Yes"}
        exectueRequest={handleConfirm}
        rightbtnbackgroundcolor={"#5D953C"}
        open={suspendUser}
        dialogStateHandle={setSuspendUser}
        heading
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: { xl: "25vw", lg: "25vw", md: "auto", sm: "auto" },
            width: { xl: "25vw", lg: "25vw", md: "auto", sm: "auto" },
            padding: "10px 20px 0px 20px",
          },
        }}
      >
        <Grid container>
          <Grid item lg={12}>
            <DSAPrimaryButton
              sx={{
                background: `${theme.palette.primary.dangerLight}`,
                color: `#EC4C4C`,
                padding: "15px 10px !important",
                marginLeft: "2px",
                borderRadius: "50%",
                border: "1px solid #F6CACA ",
                minWidth: "53px",
                marginTop: "-4vh",
              }}
              icon={
                <QuestionMark
                  sx={{
                    fontSize: "22px",
                    color: `${theme.palette.primary.dangerDark}`,
                  }}
                />
              }
            />
            <Typography
              sx={{
                marginLeft: "2px",
                fontWeight: "600",
                fontSize: "18px",
                marginTop: "1vh",
              }}
            >
              Are you sure you want to proceed ?
            </Typography>
          </Grid>
        </Grid>
      </DTModal>
      <DTModal
        open={addLocalUser}
        dialogStateHandle={setAddLocalUser}
        hideModalActionBtn
        heading={"Add Local User"}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "25vw",
            padding: "0px 18px 18px 18px",
          },
        }}
      >
        <Grid container display={"flex"} flexDirection={"column"}>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={handleCreateProduct}
          >
            {({ handleChange, touched, handleBlur, errors, values }) => {
              return (
                <Form>
                  <Box mt={-2} mx={0} sx={{ width: "100%" }}>
                    <DTTextField
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.name}
                      touch={touched.name}
                      style={{
                        borderBottom: "1px solid #DCE3EB",
                        borderRadius: 0,
                        borderBottom:
                          touched.name && errors.name
                            ? "2px solid red"
                            : "1px solid #0000006b",
                      }}
                    />
                    {errors.name && touched.name ? (
                      <ErrorSpace>{errors.name}</ErrorSpace>
                    ) : null}
                    <DTEmailField
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.email}
                      touch={touched.email}
                      style={{
                        borderBottom: "1px solid #DCE3EB",
                        borderRadius: 0,
                        borderBottom:
                          touched.email && errors.email
                            ? "2px solid red"
                            : "1px solid #0000006b",
                      }}
                    />
                    {errors.email && touched.email ? (
                      <ErrorSpace>{errors.email}</ErrorSpace>
                    ) : null}
                  </Box>

                  <Grid
                    container
                    display={"flex"}
                    justifyContent={"right"}
                    alignItems={"center"}
                    sx={{ mt: 4 }}
                  >
                    <DSAPrimaryButton
                      sx={{ padding: "8px 12px !important" }}
                      onClick={() => {
                        setAddLocalUser(false);
                      }}
                    >
                      <Typography variant="subtitle2">Cancel</Typography>
                    </DSAPrimaryButton>
                    <button
                      type="submit"
                      style={{
                        cursor: "pointer",
                        background: "#5D953C",
                        fontSize: "13px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                        border: "1px solid #EBEBF3",
                        padding: "9px 20px",
                        color: "white",
                        borderRadius: "8px",
                        fontFamily: "poppins",
                        marginLeft: "10px",
                      }}
                    >
                      Save
                    </button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </DTModal>
      <DTModal
        open={editLocalUser}
        dialogStateHandle={setEditUser}
        hideModalActionBtn
        heading={"Edit Local User"}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "25vw",
            padding: "0px 18px 18px 18px",
          },
        }}
      >
        <Grid container display={"flex"} flexDirection={"column"}>
          <Formik
            initialValues={userInitialValues}
            validationSchema={Schema}
            onSubmit={updateProduct}
          >
            {({ handleChange, touched, handleBlur, errors, values }) => {
              return (
                <Form>
                  <Box mt={-2} mx={0} sx={{ width: "100%" }}>
                    <DTTextField
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.name}
                      touch={touched.name}
                      value={values.name}
                      style={{
                        borderBottom: "1px solid #DCE3EB",
                        borderRadius: 0,
                        borderBottom:
                          touched.name && errors.name
                            ? "2px solid red"
                            : "1px solid #0000006b",
                      }}
                    />
                    {errors.name && touched.name ? (
                      <ErrorSpace>{errors.name}</ErrorSpace>
                    ) : null}
                    <DTEmailField
                      disabled={true}
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.email}
                      touch={touched.email}
                      value={values.email}
                      style={{
                        borderBottom: "1px solid #DCE3EB",
                        borderRadius: 0,
                        borderBottom:
                          touched.email && errors.email
                            ? "2px solid red"
                            : "1px solid #0000006b",
                      }}
                    />
                    {errors.email && touched.email ? (
                      <ErrorSpace>{errors.email}</ErrorSpace>
                    ) : null}
                  </Box>

                  <Grid
                    container
                    display={"flex"}
                    justifyContent={"right"}
                    alignItems={"center"}
                    sx={{ mt: 4 }}
                  >
                    <DSAPrimaryButton
                      sx={{ padding: "8px 12px !important" }}
                      onClick={() => {
                        setEditUser(false);
                      }}
                    >
                      <Typography variant="subtitle2">Cancel</Typography>
                    </DSAPrimaryButton>
                    <button
                      disabled={
                        !values.name.length
                          ? true
                          : !values.email.length || errors.email
                          ? true
                          : false
                      }
                      type="submit"
                      style={{
                        cursor: "pointer",
                        background: "#5D953C",
                        fontSize: "13px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                        border: "1px solid #EBEBF3",
                        padding: "9px 20px",
                        color: "white",
                        borderRadius: "8px",
                        fontFamily: "poppins",
                        marginLeft: "10px",
                      }}
                    >
                      Save
                    </button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </DTModal>

      <DTModal
        open={viewdetails}
        dialogStateHandle={setviewdetails}
        resetFields={() => console.log("closed")}
        hideModalActionBtn
        heading={"Product Details"}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "60vw",
            width: "60vw",
            padding: "0px 20px 20px 20px",
            background: "#FBFBFB",
            height: "60vh",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xl={7.5} lg={7.5}>
            <img
              style={{
                display: "flex",
                margin: "auto",
                maxWidth: "-webkit-fill-available",
                flexDirection: "coulnm",
                justifyContent: "center",
              }}
              alt="Media"
              src={currentProduct.current.ImageURL}
            />
          </Grid>
          <Grid item xl={4.5} lg={4.5}>
            <Grid item sx={{ mt: 0 }}>
              <CustomAccordion expanded={firstAcrodion}>
                <CustomAccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => handleAccrodianToggle("1")}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontSize: theme.typography.fontSize }}>
                    Properties
                  </Typography>
                </CustomAccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item lg={12}>
                      <Grid container>
                        <Grid
                          item
                          lg={12}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                        >
                          {Object.keys(currentProduct.current).map((item) => (
                            <>
                              <Grid
                                item
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                              >
                                <Typography
                                  sx={{
                                    color: theme.palette.primary.black,
                                    fontSize: theme.typography.extra_small,
                                  }}
                                >
                                  {item}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: theme.palette.primary.black,
                                    fontSize: theme.typography.extra_small,
                                    maxWidth: "10vw",
                                    textAlign: "left",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {currentProduct.current[item]}
                                </Typography>
                              </Grid>
                              <Divider
                                sx={{
                                  height: "2px",
                                  margin: "8px",
                                  marginLeft: "-15px",
                                  marginRight: "-15px",
                                }}
                              />{" "}
                            </>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </CustomAccordion>
              <CustomAccordion expanded={secondAcrodion}>
                <CustomAccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={() => handleAccrodianToggle("2")}
                    />
                  }
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography sx={{ fontSize: theme.typography.fontSize }}>
                    Media Info
                  </Typography>
                </CustomAccordionSummary>
                <AccordionDetails>
                  <Grid container mt={0}>
                    <Grid item lg={12}>
                      <Grid container>
                        <Grid
                          item
                          lg={6}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.primary.black,
                              fontSize: theme.typography.fontSize,
                            }}
                          >
                            Description
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"left"}
                          alignItems={"flex-start"}
                        >
                          <Typography
                            sx={{
                              fontWeight: "400",
                              fontSize: theme.typography.fontSize,
                              marginLeft: "15px",
                            }}
                          >
                            {currentProductDescription.current}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider
                        sx={{
                          height: "2px",
                          marginBottom: "8px",
                          marginLeft: "-15px",
                          marginRight: "-15px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </CustomAccordion>
            </Grid>
          </Grid>
        </Grid>
      </DTModal>
      <AddNewProduct />
    </>
  );
};

export default ProductsList;
