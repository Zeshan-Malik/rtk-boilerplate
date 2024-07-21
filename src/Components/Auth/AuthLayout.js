import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import loginPageElements from "../../Assets/Images/login_page_elements.svg";
import theme from "../../Config/theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthLayout = (props) => {
  return (
    <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.page_background,
            height: "100vh",
          }}
        >
          <Grid
            container
            sx={{
              position: "absolute",
              width: { lg: "70vw", md: "70vw", sm: "100vw", xs: "100vw" },
              borderRadius: "2px",
              height: "100vh",
              right: "0",
               background:`url(https://supercarblondie.com/wp-content/uploads/everything-we-know-bugatti-chiron-successor-2.webp)`,
               backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
           
          </Grid>
       
          {props.children}
        </Box>
    </>
  );
};

export default AuthLayout;
