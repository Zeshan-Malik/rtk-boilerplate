import {
  Grid,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import theme from "../../../theme";
import * as yup from "yup";
import { Formik, Form } from "formik";
import styled from "@emotion/styled";
import DTEmailField from "../../../components/Custom/DTEmailField";
import AuthLayout from "../../../Shared-components/AuthLayout";
import { ResetPassword } from "../authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import "./forget.css";
import { useNavigate } from "react-router-dom";
import DSASecondaryBTN from "../../../components/Custom/DSASecondaryIconButton";
import DTModal from "../../../components/Custom/DSAModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const ErrorSpace = styled("span")(({ theme }) => ({
  padding: theme.spacing(2, 0, 0, 0),
  position: "relative",
  color: 'red',
  fontWeight: 400,
  fontSize: "12px",
  fontFamily: "Poppins",
}));
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Forget = () => {
  const [openToast, setOpenToast] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorSeverity, setErrorSeverity] = useState("");
  const [msg, errorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToastClose = (event, reason) => {
    setOpenToast(false);
  };
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // forgot password api call
  const handleReset = (data) => {
    setLoading(true);
    dispatch(ResetPassword(data))
      .unwrap()
      .then((resp) => {
        if (resp.success) {
          setLoading(false);
          setSuccessModal(true)
        } else {
          setOpenToast(true);
          errorMsg(resp.msg);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const initialValues = {
    email: "",
  };

  let Schema = yup.object().shape({
    email: yup.string().email().required("Email required"),
  });

  const handleLoginRedirect = () => {
    setSuccessModal(false)
    navigate("/login");
    window.location.reload()
  }

  const handleLogin = () => {
    navigate("/login");
  }
  return (
    <>

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "18vh !important",
        }}
      >
        <Alert severity={errorSeverity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <AuthLayout>
        <Paper
          className="loginCard"
          sx={{
            boxShadow: "0px 5px 24px rgba(10, 52, 80, 0.08)",
            width: "21vw",
            position: "absolute",
            height: "27vh",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10vw",
            borderRadius: `${theme.shapes.borderRadius.split("px")[0] * 2}px`,
            padding: "60px 44px",
          }}
        >
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h6" fontWeight="bold">
                Reset Password
              </Typography>
            </Grid>
            <Grid item mt={2} md={12}>
              <Typography
                variant="caption"
                sx={{
                  color: `${theme.palette.primary.label_light_color}`,
                  ...theme.typography.heading3,
                }}
              >
                We can help you reset your password using your email address
                linked to your account.
              </Typography>
            </Grid>
            <Grid container>
              <Grid md={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Schema}
                  onSubmit={handleReset}
                >
                  {({ handleChange, touched, handleBlur, errors }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12} mt={4}>
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
                          />
                          {errors.email && touched.email ? (
                            <ErrorSpace>{errors.email}</ErrorSpace>
                          ) : null}
                        </Grid>
                      </Grid>
                      <Stack direction="row" alignItems="center" sx={{ mt: 4 }}>
                        <Box sx={{ position: "relative" }}>
                          <DSASecondaryBTN
                            sx={{
                              padding: "12px 40px !important",
                              background: "#5D953C !important",
                              color: "#FFFFFF   ",
                            }}
                            type="submit"
                            disabled={loading}
                            btnstatus={
                              errors.email
                                ? true
                                : errors.password
                                  ? true
                                  : false
                            }
                          >
                            Send Reset Mail
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
                              }}
                            />
                          )}
                        </Box>
                        <Link  onClick={handleLogin}>
                          <Box
                            sx={{ fontSize: "14px", color: "#ACACAC", ml: 2 }}
                          >
                            Back
                          </Box>
                        </Link>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <DTModal
          leftbtn={false}
          rightbtn={"Ok"}
          open={successModal}
          dialogStateHandle={handleLoginRedirect}
          exectueRequest={handleLoginRedirect}
          heading
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: { xl: "30vw", lg: "30vw", md: "auto", sm: "auto" },
              width: { xl: "30vw", lg: "30vw", md: "auto", sm: "auto" },
              padding: "10px 20px 0px 20px",
            },
          }}
        >
          <Grid container>
            <Grid item lg={12}>
              <Typography
                sx={{
                  marginLeft: "2px",
                  fontWeight: "500",
                  fontSize: "18px",
                  marginTop: "1vh",
                }}
              >
                Your password has been reset, please check your email!!
              </Typography>
            </Grid>
          </Grid>
        </DTModal>
      </AuthLayout>
    </>
  );
}

export default Forget;
