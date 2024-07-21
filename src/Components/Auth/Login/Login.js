import {
  FormControl,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Typography,
  InputLabel,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import theme from "../../../Config/theme";
import DTTextFieldLabel from "../../../Shared-Components/DTTextFieldLabel";
import * as yup from "yup";
import { Formik, Form } from "formik";
import styled from "@emotion/styled";
import DTEmailField from "../../../Shared-Components/DTEmailField";
import AuthLayout from "../AuthLayout";
import { login } from "../authSlice";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";
import { useNavigate } from "react-router-dom";

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
  paddingLeft: "0",
  "& .MuiOutlinedInput-input": {
    border: "none",
    fontSize: "13px",
    padding: "20px 0 10px !important",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [checked, setChecked] = useState();
  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, errorMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCreate = () => {
    navigate("/signup");
  };

  const handleForget = () => {
    navigate("/forgetpassword");
  };

  // handleLogin
 
  const handleLogin = (data) => {
    setLoading(true);
    dispatch(login(data))
      .unwrap()
      .then((response) => {
        debugger
        if (response.success) {;
          navigate("/dashboard");
          setValue(0);
          // setTimeout(window.location.reload(), 1000);
        } else {
          setOpenToast(true);
          errorMsg(response.msg);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Snackbar
  const handleToastClose = (event, reason) => {
    setOpenToast(false);
  };

  let Schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z]).{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
      ),
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
          className="loginCard"
          sx={{
            boxShadow: "0px 5px 24px rgba(10, 52, 80, 0.08)",
            width: "23vw",
            position: "absolute",
            height: "auto",
            top: "50%",
            transform: "translateY(-50%)",
            left: {
              xl: "10vw",
              lg: "10vw",
              md: "calc(50% - 38%)",
              sm: "calc(50% - 40%)",
              xs: "calc(50% - 40%)",
            },
            borderRadius: `${theme.shapes.borderRadius.split("px")[0] * 2}px`,
            padding: "60px 44px",
          }}
        >
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Welcome To Buggati Dubai
              </Typography>
            </Grid>
            <Grid item mt={2} xl={10} lg={10} md={10} sm={10} xs={10}>
              <Typography
                variant="caption"
                sx={{
                  color: `${theme.palette.primary.label_light_color}`,
                  ...theme.typography.heading3,
                  // width: '60%'
                }}
              >
                Enter credentials below to login to your account.
              </Typography>
            </Grid>
            <Grid container>
              <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Schema}
                  onSubmit={async (data) => {
                    setLoading(true);
                    var authData = await dispatch(handleLogin(data));
                    setLoading(false);
                  }}
                >
                  {({ handleChange, touched, handleBlur, errors }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          mt={4}
                        >
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
                                touched.password && errors.password
                                  ? "2px solid red"
                                  : "1px solid #0000006b",
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: "#AECA9D" }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {errors.email && touched.email ? (
                            <ErrorSpace>{errors.email}</ErrorSpace>
                          ) : null}
                        </Grid>
                        <Grid
                          item
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          mt={2}
                        >
                          <div>
                            <FormControl
                              variant="standard"
                              fullWidth={true}
                              sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                  borderBottom: "1px solid #DCE3EB",
                                },
                                "& .Mui-focused": { color: "red !important" },
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
                                startAdornment={
                                  <InputAdornment position="start">
                                    <LockIcon
                                      sx={{
                                        color: "#AECA9D",
                                        mt: 1,
                                        fontSize: "20px",
                                      }}
                                    />
                                  </InputAdornment>
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PersonIcon sx={{ color: "#AECA9D" }} />
                                    </InputAdornment>
                                  ),
                                }}
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
                        <Grid item xs={6} md={6} sm={6}>
                          <div className="remember-checkbox">
                            <FormGroup
                              sx={{
                                mt: 1,
                                mb: 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="checkbox"
                                defaultChecked
                                checked={checked}
                                name="assigned"
                                value={checked}
                                onChange={handleChange}
                              ></input>
                              <DTTextFieldLabel
                                sx={{ fontSize: "14px", color: "#ACACAC" }}
                                style={{ marginBottom: "0" }}
                              >
                                Remember me
                              </DTTextFieldLabel>
                            </FormGroup>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          md={6}
                          sm={6}
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            sx={{ color: "#ACACAC", fontSize: "14px" }}
                            variant="body2"
                            onClick={handleForget}
                          >
                            {"Forgot password?"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 3 }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <button
                            disabled={loading}
                            type="submit"
                            style={{
                              cursor: 'pointer',
                              background: "#5D953C",
                              color: "#FFFFFF",
                              fontSize: '13px',
                              fontWeight: '400',
                              textTransform: 'capitalize',
                              border: '1px solid #EBEBF3',
                              padding: '14px 40px',
                              background: '#5D953C',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              fontFamily: 'poppins',
                            }}>
                            Login
                          </button>
                          {loading && (
                            <CircularProgress
                              size={24}
                              sx={{
                                color: "#0A3450",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-10%",
                              }}
                            />
                          )}
                        </Box>
                        <Box>
                          <Box sx={{ fontSize: "14px", color: "#ACACAC" }}>
                            Do not have an account?
                          </Box>
                          <Link
                            sx={{ color: "#5D953C", fontSize: "14px" }}
                            variant="body2"
                            onClick={handleCreate}
                          >
                            {"Create New One"}
                          </Link>
                        </Box>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        </AuthLayout>
    </>
  );
}

export default Login;
