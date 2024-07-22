import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import theme from "../../Config/theme";
import DTTextField from "../../Shared-Components/DTTextField";
import DSASecondaryBTN from "../../Shared-Components/DSASecondaryIconButton";
import DeleteIconn from "@mui/icons-material/Delete";
import QuestionMark from "@mui/icons-material/QuestionMark";
import DSAPrimaryButton from "../../Shared-Components/DSAPrimaryButton";
import DSAEnhancedTable from "../../Shared-Components/DSAEnhancedTable";
import DTModal from "../../Shared-Components/DSAModal";
import { useEffect } from "react";
import OkIcon from "../../Assets/Images/OkIcon.svg";
import Error from "../../Assets/Images/Error.svg";
import { ReactComponent as ReferenceIcon } from "../../Assets/Images/edit.svg";
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
import {getAllProducts, createNewProduct, deleteProduct, updateProduct} from './productsSlice'

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
    minWidth: "150px",
    show: true,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    type: "text",
    avatar: false,
    align: "left",
    minWidth: "110px",
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
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
    type: "text",
    avatar: false,
    align: "left",
    minWidth: "150px",
    show: true,
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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [error_type, errorType] = useState("");
  const [user, setUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const [permissonId, setPermissonId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const tableData = usersList?.map((item, index) => {
    const data = {
      sr: index + 1,
      name:item.name,
      email: item.email,
      status: {
        icons: [
          {
            element: (
              <>
                <p
                  className={
                    item.status === "Suspended"
                      ? "suspended-background"
                      : "active-background"
                  }
                >
                  {item.status}
                </p>
              </>
            ),
          },
        ],
        value: `${" "}`,
      },
      role: item.role,
      action: {
        value: " ",
        icons: [
          {
            element: (
              <DSAToolTip placement="top" title={"Edit User"}>
                <ReferenceIcon
                  onClick={() => {
                    setUser(item)
                    setEditUser(true);
                  }}
                />
              </DSAToolTip>
            ),
          },
          {
            element: (
              <DSAToolTip placement="top" title={"User Permissons"}>
                <LikeIcon
                  onClick={() => {
                    setOpenPermisson(true);
                    setPermissonId(item.id);
                    setCurrentUser(item)
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
              <DSAToolTip placement="top" title={"Delete User"}>
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
    let user = [...usersList]
    user = user.filter(item => item.id === value[0])
    setSelectedUser(user)
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

  const [loading, setLoading] = useState(false)
  const handleCreateProduct = async (values) => {
    setLoading(true)
    const response = await dispatch(
      createNewProduct({ email: values.email, name: values.name })
    );
    if (response.payload.data.success) {
      setAddLocalUser(false);
      setSuccessModal(true);
      setLoading(false)
    } else {
      setLoading(false)
      setOpenToast(true);
      errorMsg(response.payload?.data.msg);
      errorType("error");
    }
  };

  // delete user
  const handleDeleteConfirm = async () => {
    let id = userId ? userId : rowId[0]
    const response = await dispatch(deleteProduct(id));
    if (response.payload) {
      setOpenToast(true);
      errorMsg('Local user removed successfully');
      setDeleteEntry(false);
      errorType("success");
      getAllProducts();
      setRowId([])
    } else {
      setOpenToast(true);
      errorMsg(response.payload?.data.msg);
      errorType("error");
    }
  };

  const handleConfirm = async () => {
    if (selectedUser[0].status === 'Active') {
      handleChangeStatus()}
  }

  const handleChangeStatus = async () => {
    const response = await dispatch(updateProduct(rowId[0]))
    if (response.payload.data.success) {
      setOpenToast(true);
      setSelectedUser([])
      setRowId([])
      errorMsg('User susspended successfully');
      errorType("success");
      setEditUser(false)
      getAllProducts();
    } else {
      setOpenToast(true);
      errorMsg(response.payload.data.msg);
      errorType("error");
    }
    setSuspendUser(false)
  }


 
  const ErrorSpace = styled("span")(({ theme }) => ({
    position: "relative",
    color: 'red',
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
                  Local User Management
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
                    {rowId.length ? <DSAPrimaryButton
                      onClick={() => setDeleteEntry(true)}
                      sx={{
                        background: `${theme.palette.primary.dangerLight}`,
                        color: `${theme.palette.primary.dangerDark}`,
                        padding: "8px 8px !important",
                        marginLeft: "10px",
                        border: "1.5px solid rgba(236, 76, 76, 0.2)",
                        borderRadius: "10px",
                        minWidth: "50px",
                        maxHeight: "50px",
                      }}
                      icon={
                        <DeleteIconn
                          sx={{
                            fontSize: "22px",
                            color: `${theme.palette.primary.notificationIconColor}`,
                          }}
                        />
                      }
                    /> : ''}
                    <DSAPrimaryButton
                      disabled={selectedUser[0]?.status === 'Suspended' || !selectedUser.length || rowId.length > 1}
                      sx={{ marginLeft: "15px", padding: "8px 22px" }}
                      onClick={() => setSuspendUser(true)}
                    >
                      <img src={Error} alt={"SuspendUser"} />
                      <Typography
                        sx={{
                          fontSize: `${theme.shapes.primaryBtnFontSize}`,
                          marginLeft: "10px",
                        }}
                      >
                        Suspend User
                      </Typography>
                    </DSAPrimaryButton>
                    <DSAPrimaryButton
                      sx={{ marginLeft: "15px", padding: "8px 22px" }}
                      onClick={() => setSuspendUser(true)}
                      disabled={selectedUser[0]?.status === 'Active' || !selectedUser.length || rowId.length > 1}
                    >
                      <img src={OkIcon} alt={"OkIcon"} />
                      <Typography
                        sx={{
                          fontSize: `${theme.shapes.primaryBtnFontSize}`,
                          marginLeft: "10px",
                        }}
                      >
                        Active User
                      </Typography>
                    </DSAPrimaryButton>

                    <DSASecondaryBTN
                      onClick={() => setAddLocalUser(true)}
                      sx={{
                        marginLeft: "10px",
                        padding: "9px 20px",
                        fontWeight: "500",
                      }}
                    >
                      + Add
                    </DSASecondaryBTN>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ maxHeight: '50vh' }}>
              <DSAEnhancedTable
                rowsPage={100}
                minHeight="30vh"
                maxHeight='inherit'
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
                        cursor: 'pointer',
                        background: "#5D953C",
                        fontSize: '13px',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        border: '1px solid #EBEBF3',
                        padding: '9px 20px',
                        color: 'white',
                        borderRadius: '8px',
                        fontFamily: 'poppins',
                        marginLeft: '10px',

                      }}>
                      Save
                    </button>
                  </Grid>
                </Form>)
            }
            }</Formik>
        </Grid>
      </DTModal>
      <DTModal
        open={editLocalUser}
        dialogStateHandle={setEditUser}
        hideModalActionBtn
        heading={'Edit Local User'}
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
                            : false}
                      type="submit"
                      style={{
                        cursor: 'pointer',
                        background: "#5D953C",
                        fontSize: '13px',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        border: '1px solid #EBEBF3',
                        padding: '9px 20px',
                        color: 'white',
                        borderRadius: '8px',
                        fontFamily: 'poppins',
                        marginLeft: '10px',

                      }}>
                      Save
                    </button>
                  </Grid>
                </Form>)
            }
            }</Formik>
        </Grid>
      </DTModal>
    </>
  );
};

export default ProductsList;
