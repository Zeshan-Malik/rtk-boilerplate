import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../../Config/theme";

const DashboardHead = () => {
  return (
    <Grid container xs={12} mt={-1} sx={{ padding: "0px 12px 16px 12px" }}>
      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent={"left"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: theme.palette.primary.pageHeadingColor,
            fontSize: theme.shapes.page_heading,
            letterSpacing: "0.15px",
            display: "block",
            fontWeight: 600,
          }}
        >
          Welcome to DSA Dashboard
        </Typography>
      </Grid>

      <Grid
        item
        xs={6}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
      </Grid>
    </Grid>
  );
};

export default DashboardHead;
