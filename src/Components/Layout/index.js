import React, { useState } from "react";
import { Box, Grid, ListItem, ListItemText } from "@mui/material";
import theme from "../../Config/theme";
import SideBarList from "../../Shared-Components/DSASidebatLIsting";
import styled from "styled-components";
import DTSpinner from "../../Shared-Components/DTSpinner";
import { useDispatch } from "react-redux";
import { convertHexToRGBA } from "../../services/utils";
import PersonIcon from "@mui/icons-material/Person";
import PixIcon from '@mui/icons-material/Pix';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RoomIcon from "@mui/icons-material/Room";
import Crop169Icon from "@mui/icons-material/Crop169";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import TopBarLayOut from "../TopbarLayout.js";
import { useNavigate } from "react-router-dom";

const MainLayout = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);


  let appIconColor = "#0080001a";
 
  const CustomListItem = styled(ListItem)(({ theme }) => ({
    padding: "10px 0 10px 5px",
    color: theme?.palette?.primary.tableAndTab,
    fontSize: "13px",
    borderRadius: "15px",
    border: "1px solid rgb(255 255 255 / 30%)",
    "&:hover": {
      backgroundColor: "",
      borderRadius: "15px",
      color:  theme?.palette?.primary.green_dark,
      border: "",
    },
    "&:hover > .MuiPaper-root": {
      color: "#5D953C",
      background:"",
    },
  }));

  const sideMenu = [
    {
      id: 1,
      name: "Dashboard",
      routeName:'/dashboard',
      icon: (
        <PersonIcon
          sx={{ color: appIconColor, fontSize: "22px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 2,
      name: "Products Modules",
      routeName:'/products-listing',
      icon: (
        <PixIcon
          sx={{ color: appIconColor, fontSize: "22px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 3,
      name: "License Management",
      icon: (
        <VpnKeyIcon
          sx={{ color: appIconColor, fontSize: "22px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 4,
      name: "Location Management",
      icon: (
        <RoomIcon
          sx={{ color: appIconColor, fontSize: "22px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 5,
      name: "Players Registration",
      icon: (
        <Crop169Icon
          sx={{ color: appIconColor, fontSize: "22px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 6,
      name: "Local Users Management",
      icon: (
        <PersonIcon
          sx={{ color: appIconColor, fontSize: "18px", paddingRight: "12px" }}
        />
      ),
    },
    {
      id: 7,
      name: "Power Bi Login",
      icon: (
        <AlignVerticalBottomIcon
          sx={{ color: appIconColor, fontSize: "18px", paddingRight: "12px" }}
        />
      ),
    },
  ];
 
  return (
    <>
      <DTSpinner open={loading} />
      <>
      <TopBarLayOut />
      <Grid
        container
        xs={12}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        pt={2}
        sx={{
        }}

      >
        <Grid xs={2}>
          <Box
            sx={{
              background: `${theme.palette.primary.white}`,
              padding: "20px 10px 10px 14px",
              marginRight: "2vh",
              borderRadius:'0px 20px 20px 0px',
              minHeight:'87.5vh'
            }}
          >
             <SideBarList>
              {sideMenu.map((item) => {
                return (
                  <>
                    <CustomListItem
                      sx={{
                        background:
                          active === item.id
                            ? convertHexToRGBA(appIconColor)
                            : "",
                        marginTop: "4px",
                        cursor: "pointer",
                        border:
                          active === item.id 
                            ? `1px solid${convertHexToRGBA(appIconColor)}`
                            : "",
                      }}
                      onClick={() =>{
                        setActive(item.id)
                        navigate(item.routeName)}}
                    >
                      {item?.icon}
                      <ListItemText primary={item.name} />
                    </CustomListItem>
                    <Box
                      sx={{ borderBottom: "1px solid #e5e5e5" }}
                      mb={1}
                      mr={1}
                      ml={1}
                      mt={1}
                    ></Box>
                  </>
                );
              })}
            </SideBarList> 
          </Box>
        </Grid>
        <Grid xs={10}>
         <Box
            sx={{
              background:theme.palette.primary.white,
              padding: "20px 10px 0px 14px",
              borderRadius:'20px',
              marginRight:'20px',
              minHeight:'88vh'
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
      </>
    </>
  );
};

export default MainLayout;
