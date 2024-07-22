import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import theme from "../../Config/theme";
import userImage from "../../Assets/Images/Profile.png";
// import BasicTabs from "./TabControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PublicIcon from "@mui/icons-material/Public";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DSAToolTip from "../../Shared-Components/DSAToolTip";
import { Stack } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FeedIcon from "@mui/icons-material/Feed";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { logoutUser } from "../Auth/authSlice";
import { useState } from "react";

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(1)})`,
//     transition: theme.transitions.create("width"),
//     width: "30vw !important",
//     [theme.breakpoints.down("md")]: {
//       width: "50ch",
//       height: "5vh",
//     },
//   },
// }));

export default function TopBarLayOut(props) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  let themeObj =  "";
  let headerBackground = "#5d953c";

  let headerIcons = "";
  let headerHeigth = "";
  let headerWidth = "";

  let appIconColor = "#" + themeObj?.app_icon_color;
 
  const handleAdminSettings = (key) => {
   
  };
  const TopBar = styled(AppBar)(({ theme }) => ({
    background:
      headerBackground !== undefined && headerBackground !== ""
        ? headerBackground
        : theme.palette.primary.top_nav_bar_background,
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "40vw !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    background:
      headerBackground !== undefined && headerBackground !== ""
        ? headerBackground
        : theme.palette.primary.search_bar_background,
    color: theme.palette.primary.white,
    border: "1px solid #ffffff21",
  }));

  const IconButtons = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      backgroundColor: `#83991400`,
    },
  }));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const response = await dispatch(logoutUser());
    if (response.payload.data.success) {
      localStorage.clear();
      navigate('/login')
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getScreenValue = () => {
    if (windowWidth > 1600) {
      return "87%  !important";
    } else if (windowWidth > 1400 && windowWidth < 1600) {
      return "84%  !important";
    } else if (windowWidth > 1300 && windowWidth < 1400) {
      return "82%  !important";
    } else if (windowWidth > 1100 && windowWidth < 1300) {
      return "80%  !important";
    } else if (windowWidth > 800 && windowWidth < 1100) {
      return "76%  !important";
    } else {
      return "72%  !important";
    }
  };

  const menuId = "primary-account-menu";
  const renderMenu = (
    <Menu
      sx={{
        left: getScreenValue(),
        right: "0% !important",
        top: "5% !important",
      }}
      anchorEl={anchorEl}
      id="menu-appbar"
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          fontSize: `${theme.typography.fontSize}`,
          borderRadius: `${theme.shapes.borderRadius}`,
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: "14px" }}>
        <Stack
          direction="row"
          alignItems="center"
          onClick={() => handleAdminSettings("account")}
        >
          <SettingsIcon
            sx={{
              paddingRight: "10px",
              color: `${
                appIconColor ? appIconColor : theme.palette.primary.white
              }`,
              fontSize: "17px",
            }}
          />
          <Box>Account Setting</Box>
        </Stack>
      </MenuItem>
      <MenuItem className={"anchor-style"} sx={{ fontSize: "14px" }}>
        <a href="http://dsa-cloud.com/" target="_blank" rel="noreferrer">
          <Stack direction="row" alignItems="center">
            <LanguageIcon
              sx={{
                paddingRight: "10px",
                color: `${
                  appIconColor ? appIconColor : theme.palette.primary.white
                }`,
                fontSize: "17px",
              }}
            />
            <Box
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Company Website
            </Box>
          </Stack>
        </a>
      </MenuItem>

      <MenuItem onClick={handleLogout} sx={{ fontSize: "14px" }}>
        <Stack direction="row" alignItems="center">
          <ExitToAppIcon
            sx={{
              paddingRight: "10px",
              color: `${
                appIconColor ? appIconColor : theme.palette.primary.white
              }`,
              fontSize: "17px",
            }}
          />
          <Box>Logout</Box>
        </Stack>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          background: `${theme.palette.primary.white}`,
          borderRadius: `${theme.shapes.borderRadius}`,
        },
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        sx={{}}
        onClick={() => {
          navigate("newsboard");
          setValue(11);
        }}
      >
        <IconButton size="large" aria-label="show 17 new notifications">
          <FeedIcon sx={{ color: `${appIconColor}!important` }} />
        </IconButton>
        <p style={{ fontSize: "13px" }}>News Board</p>
      </MenuItem>
      <MenuItem
        sx={{}}
        onClick={() => {
          navigate("geolocation");
          setValue(10);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PublicIcon
            sx={{
              color: `${
                appIconColor ? appIconColor : theme.palette.primary.green_dark
              }`,
            }}
          />{" "}
        </IconButton>
        <p style={{ fontSize: "13px" }}>Geo Location</p>
      </MenuItem>

      <MenuItem
        sx={{}}
        onClick={() => {
          navigate("mailbox");
          setValue(12);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MailIcon
            sx={{
              color: `${
                appIconColor ? appIconColor : theme.palette.primary.white
              }`,
            }}
          />
        </IconButton>
        <p style={{ fontSize: "13px" }}>Mailbox</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsIcon
            sx={{
              color: `${
                appIconColor ? appIconColor : theme.palette.primary.white
              }`,
            }}
          />{" "}
        </IconButton>
        <p style={{ fontSize: "13px" }}>Admin Settings</p>
      </MenuItem>
      <MenuItem sx={{}} className="anchor-style">
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <a
            href="https://dsa.freshdesk.com/support/login"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <ContactSupportIcon
                sx={{
                  color: `${
                    appIconColor
                      ? appIconColor
                      : theme.palette.primary.green_dark
                  }`,
                }}
              />
            </IconButton>
            <Box sx={{ fontSize: "12px" }}>Support</Box>
          </a>
        </Stack>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1,}}>
        <TopBar position="static"
        //  sx={{borderRadius:'20px 20px 0px 0px'}}
         >
          <Toolbar>
            <Box
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                height: `${headerHeigth}`,
                width: `${headerWidth}`,
                // backgroundImage: `url(${themeLogo})`,
                marginTop: "4px",
                marginBottom: "4px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButtons
                size="large"
                aria-label="show 4 new mails"
                sx={{
                  color: `${
                    headerIcons ? headerIcons : theme.palette.primary.white
                  }`,
                }}
                onClick={() => {
                  navigate("mailbox");
                  setValue(12);
                }}
              >
                <DSAToolTip title="Mail Box" placement="top">
                  <MailIcon
                    sx={{
                      color: `${
                        headerIcons ? headerIcons : theme.palette.primary.white
                      }`,
                    }}
                  />
                </DSAToolTip>
              </IconButtons>
              <IconButtons
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  navigate("newsboard");
                  setValue(11);
                }}
              >
                <DSAToolTip placement="top" title="Newsboard">
                  <ArticleIcon
                    sx={{
                      color: `${
                        headerIcons ? headerIcons : theme.palette.primary.white
                      }`,
                    }}
                  />
                </DSAToolTip>
              </IconButtons>
              <IconButtons
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  navigate("geolocation");
                  setValue(10);
                }}
              >
                <DSAToolTip placement="top" title="Geo Location">
                  <PublicIcon
                    sx={{
                      color: `${
                        headerIcons ? headerIcons : theme.palette.primary.white
                      }`,
                    }}
                  />
                </DSAToolTip>
              </IconButtons>
              <IconButtons
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => handleAdminSettings("admin")}
              >
                <DSAToolTip placement="top" title="Admin Setting">
                  <SettingsIcon
                    sx={{
                      color: `${
                        headerIcons ? headerIcons : theme.palette.primary.white
                      }`,
                    }}
                  />
                </DSAToolTip>
              </IconButtons>
              <IconButtons
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
              >
                <DSAToolTip
                  placement="top"
                  className="anchor-style"
                  title="Support"
                >
                  <a
                    href="https://dsa.freshdesk.com/support/login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ContactSupportIcon
                      sx={{
                        color: `${
                          headerIcons
                            ? headerIcons
                            : theme.palette.primary.white
                        }`,
                        margin: "0px",
                        paddingTop: "4px",
                      }}
                    />
                  </a>
                </DSAToolTip>
              </IconButtons>
              <IconButtons
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ paddingRight: "0px !important" }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "20px",
                  }}
                  src={`${userImage}`}
                  alt="current user"
                />
              </IconButtons>
              <IconButtons
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <KeyboardArrowDownIcon
                  sx={{
                    color: `${
                      headerIcons ? headerIcons : theme.palette.primary.white
                    }`,
                    padding: "0px",
                  }}
                />
              </IconButtons>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButtons
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButtons>
            </Box>
          </Toolbar>
        </TopBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
  