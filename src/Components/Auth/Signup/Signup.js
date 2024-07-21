import {
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../Config/theme";
import DTTextField from "../../../Shared-Components/DTTextField";
import * as yup from "yup";
import { Formik, Form } from "formik";
import styled from "@emotion/styled";
import DTEmailField from "../../../Shared-Components/DTEmailField";
import DTSelect from "../../../Shared-Components/DSASelect";
import AuthLayout from "../AuthLayout";
import authSlice, { signupUser } from "../authSlice";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import "./signup.css";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DSASecondaryBTN from "../../../Shared-Components/DSASecondaryIconButton";
import DTModal from "../../../Shared-Components/DSAModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ErrorSpace = styled("span")(({ theme }) => ({
  padding: theme.spacing(2, 0, 0, 0),
  position: "relative",
  color: 'red',
  fontWeight: 400,
  fontSize: "12px",
  fontFamily: "Poppins",
}));

const DTPasswordArea = styled(OutlinedInput)(({ theme }) => ({
  color: "inherit",
  borderRadius: theme.shapes.borderRadius,
  width: "100%",
  "& .MuiOutlinedInput-input": {
    border: "none",
    fontSize: "13px",
    padding: "20px 0 10px !important",
  },
}));

function Signup() {
  const initialValues = {
    name: "",
    company: "",
    phone_number: "",
    country: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  // country
  const dispatch = useDispatch();

  // handleRegister
  let navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const handleRegister = async (data) => {
    const payload = {
      name:data.name,
      email:data.email,
      password:data.password

    }
    setLoading(true);
    let response = await dispatch(signupUser(payload))
    if (response.payload.success) {
      setLoading(false);
      navigate("/dashboard");
    } else {
      setOpenToast(true);
      errorMsg(response.payload.msg);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/dashboard");
  }

  // Snackbar
  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const handleToastClose = (event, reason) => {
    setOpenToast(false);
  };

  //password and confirm password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const FormSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    company: yup.string().required("Company name is required"),
    email: yup.string().email().required("Email is required"),
    phone_number: yup.string().matches(/^[0-9]+$/, "Phone number must contain only numbers").required("Phone number is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Password required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Must match password field value").required("Confirm Password"),
  });

  return (
    <>
      <AuthLayout>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleToastClose}
          sx={{
            bottom: "auto !important",
            left: "auto !important",
            right: "24px !important",
            top: "24px",
          }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
        <Paper
          className="signUpCard"
          sx={{
            boxShadow: "0px 5px 24px rgba(10, 52, 80, 0.08)",
            width: "25vw",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10vw",
            borderRadius: `${theme.shapes.borderRadius.split("px")[0] * 2}px`,
            padding: "45px 44px",
            height: "auto",
          }}
        >
          <Stack>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Welcome To Buggati Dubai
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    width: "60%",
                    color: `#ACACAC`,
                    fontSize: "1rem",
                    mb: "20px",
                    mt: "7px",
                    ml: "1px",
                  }}
                >
                  Please Create an account.
                </Typography>
              </Grid>
            </Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={handleRegister}
            >
              {({ handleChange, touched, handleBlur, errors, values }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
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
                      </Grid>
                      <Grid item xs={12} md={12}>
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
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <DTTextField
                          label="Company"
                          name="company"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={errors.company}
                          touch={touched.company}
                          style={{
                            borderBottom: "1px solid #DCE3EB",
                            borderRadius: 0,
                            borderBottom:
                              touched.company && errors.company
                                ? "2px solid red"
                                : "1px solid #0000006b",
                          }}
                        />
                        {errors.company && touched.company ? (
                          <ErrorSpace>{errors.company}</ErrorSpace>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <DTTextField
                          label="Phone Number"
                          name="phone_number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={errors.phone_number}
                          touch={touched.phone_number}
                          style={{
                            borderBottom: "1px solid #DCE3EB",
                            borderRadius: 0,
                            borderBottom:
                              touched.phone_number && errors.phone_number
                                ? "2px solid red"
                                : "1px solid #0000006b",
                          }}
                        />
                        {errors.phone_number && touched.phone_number ? (
                          <ErrorSpace>{errors.phone_number}</ErrorSpace>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div>
                          <FormControl
                            variant="standard"
                            fullWidth={true}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                borderBottom: "1px solid #DCE3EB",
                              },
                              "& .Mui-focused": { color: "#333333 !important" },
                            }}
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <DTPasswordArea
                              size="small"
                              id="standard-adornment-password"
                              variant="standard"
                              style={{
                                borderBottom: "1px solid #DCE3EB",
                                borderRadius: 0,
                                borderBottom:
                                  touched.password && errors.password
                                    ? "2px solid red"
                                    : "1px solid #0000006b",
                              }}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              label="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityIcon
                                        sx={{
                                          color: "#AECA9D",
                                          fontSize: "20px",
                                        }}
                                      />
                                    ) : (
                                      <VisibilityOffIcon
                                        sx={{
                                          color: "#AECA9D",
                                          fontSize: "20px",
                                        }}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          {errors.password && touched.password ? (
                            <ErrorSpace>{errors.password}</ErrorSpace>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div>
                          <FormControl
                            variant="standard"
                            fullWidth={true}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                borderBottom: "1px solid #DCE3EB",
                              },
                              "& .Mui-focused": { color: "#333333 !important" },
                            }}
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Confirm Password
                            </InputLabel>
                            <DTPasswordArea
                              size="small"
                              id="standard-adornment-confirm-password"
                              variant="standard"
                              style={{
                                borderBottom: "1px solid #DCE3EB",
                                borderRadius: 0,
                                borderBottom:
                                  touched.confirm_password &&
                                    errors.confirm_password
                                    ? "2px solid red"
                                    : "1px solid #0000006b",
                              }}
                              name="confirm_password"
                              type={showConfirmPassword ? "text" : "password"}
                              label="Confirm Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? (
                                      <VisibilityIcon
                                        sx={{
                                          color: "#AECA9D",
                                          fontSize: "20px",
                                        }}
                                      />
                                    ) : (
                                      <VisibilityOffIcon
                                        sx={{
                                          color: "#AECA9D",
                                          fontSize: "20px",
                                        }}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          {errors.confirm_password &&
                            touched.confirm_password ? (
                            <ErrorSpace>{errors.confirm_password}</ErrorSpace>
                          ) : null}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid sx={{ mt: 2, position: "relative" }}>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        lg={5}
                        md={5}
                        sm={12}
                        xs={12}
                        sx={{ mt: 2, position: "relative" }}
                      >
                        <DSASecondaryBTN
                          type="submit"
                          disabled={loading}
                          btnstatus={
                            errors.email
                              ? true
                              : errors.phone
                                ? true
                                : errors.name
                                  ? true
                                  : errors.company
                                    ? true
                                      : errors.password
                                        ? true
                                        : errors.confirm_password
                                          ? true
                                          : false
                          }
                          sx={{
                            padding: "12px 40px !important",
                            background: "#5D953C !important",
                            color: "#FFFFFF   ",
                          }}
                        >
                          Create
                        </DSASecondaryBTN>
                        {loading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: "#0A3450",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-25%",
                            }}
                          />
                        )}
                      </Grid>
                      <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        sx={{
                          mt: 4,
                          color: `#ACACAC`,
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Already have an account?
                        <Link
                          sx={{ color: "#5D953C", fontSize: "14px", ml: 1 }}
                          onClick={handleLogin}
                          variant="body2"
                        >
                          {"Login"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </Paper>
      </AuthLayout>
    </>
  );
}

export default Signup;
