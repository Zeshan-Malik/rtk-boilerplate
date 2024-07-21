import {
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../theme";
import * as yup from "yup";
import { Formik, Form } from "formik";
import styled from "@emotion/styled";
import DSAPrimaryButton from "../../../components/Custom/DSAPrimaryButton";
import AuthLayout from "../../../Shared-components/AuthLayout";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import "./changepassword.css";

const ErrorSpace = styled("span")(({ theme }) => ({
  padding: theme.spacing(2, 0, 0, 0),
  position: "relative",
  color: theme.palette.primary.error_red,
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
    padding: "20px 0 10px !important"
  },
}));

function Signup() {

  const [showPassword, setShowPassword] = useState(false);;
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const FormSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Must match password field value'),
  });

  return (
    <>
      <AuthLayout>
        <Paper className="signUpCard"
          sx={{
            boxShadow: "0px 5px 24px rgba(10, 52, 80, 0.08)",
            width: "25vw",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10vw",
            borderRadius: `${theme.shapes.borderRadius.split("px")[0] * 2}px`,
            padding: "45px 44px",
            height: "auto"
          }}
        >
          <Stack>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Create New Password
                </Typography>
              </Grid>
              <Grid sx={{ mt: 1, mb: 5 }} item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="caption"
                  sx={{
                    width: "60%",
                    color: `${theme.palette.primary.label_light_color}`,
                    fontSize: "1rem",
                  }}
                >
                  Please enter a new Password!
                </Typography>
              </Grid>
            </Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={async (data) => {
                setLoading(true);
                setLoading(false);
              }}
            >
              {({ handleChange, touched, handleBlur, errors }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
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
                              "& .Mui-focused": { color: "#333333 !important" }
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
                              "& .Mui-focused": { color: "#333333 !important" }
                            }}
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Confirm Password
                            </InputLabel>
                            <DTPasswordArea
                              size="small"
                              id="standard-adornment-password"
                              variant="standard"
                              style={{
                                borderBottom: "1px solid #DCE3EB",
                                borderRadius: 0,
                                borderBottom:
                                  touched.confirm_password && errors.confirm_password
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
                          {errors.confirm_password && touched.confirm_password ? (
                            <ErrorSpace>{errors.confirm_password}</ErrorSpace>
                          ) : null}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container >
                      <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 7, position: "relative" }}>
                        <DSAPrimaryButton
                          type="submit"
                          disabled={loading}
                          btnstatus={
                            errors.password ? true : errors.confirm_password ? true : false
                          }
                        >
                          Submit
                        </DSAPrimaryButton>
                        {loading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: "#0A3450",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-35%",
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                )
              }}
            </Formik>
          </Stack>
        </Paper>
      </AuthLayout>
    </>
  );
}

export default Signup;
