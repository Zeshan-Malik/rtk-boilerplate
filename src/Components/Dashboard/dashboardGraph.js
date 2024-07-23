import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Graphs from "./Barchart";
import playerIcon from "../../Assets/Images/playerIcon.svg";
import activePlayList from "../../Assets/Images/activePlayList.svg";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Box } from "@mui/system";

const DetailsCard = (props) => {
  return (
    <Grid
      lg={5.5}
      md={5.5}
      xs={5.5}
      sx={{
        margin: "0px 0px 20px  0px",
        padding: "15px",
        borderRadius: "12px",
        backgroundColor: props.backgroundColor,
        minHeight: "20vh",
      }}
    >
      <img src={props.image} />
      <Typography
        sx={{
          color: props.color ? props.color : "#FFFFFF",
          letterSpacing: "0.15px",
          display: "block",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "36px",
          lineHeight: "36px",
        }}
        pt={2}
      >
        {props.value}
      </Typography>
      <Typography
        sx={{
          color: props.color ? props.color : "#FFFFFF",
          letterSpacing: "0.15px",
          display: "block",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "27px",
        }}
        pt={2}
      >
        {props.tittle}
      </Typography>
    </Grid>
  );
};


const DashboardGraph = () => {
  const dispatch = useDispatch();

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {/*-------------------------------------------------- Barchart Section----------------------------------------------- */}
          <Grid item lg={6} md={6} xs={6} pr={3}>
            <Paper
              sx={{
                maxHeight: 'auto',
                height: 500,
                minHeight: 500,
                backgroundColor: "#fff",
                borderRadius: "12px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  letterSpacing: "0.15px",
                  display: "block",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "27px",
                }}
                pt={2}
                pl={2}
              >
                Player Status
              </Typography>
              <Graphs />
            </Paper>
          </Grid>
          {/*-------------------------------------------------- Details Section----------------------------------------------- */}
          <Grid item lg={4} md={4} xs={4} pl={2} pr={2}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              mt={2.5}
            >
              <DetailsCard
                image={playerIcon}
                value={92}
                tittle={"Total Sold"}
                backgroundColor={"#895FAF"}
              />
              <DetailsCard
                image={activePlayList}
                value={30}
                tittle={"Available Vehicle"}
                backgroundColor={"#FFFFFF"}
                color={"#000000"}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <DetailsCard
                image={totalErrors}
                value={24}
                tittle={"Total Errors"}
                backgroundColor={"#EC635D"}
              />
              <DetailsCard
                image={downloadsIcon}
                value={89}
                tittle={"Total Downloads"}
                backgroundColor={"#6869B2"}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardGraph;
