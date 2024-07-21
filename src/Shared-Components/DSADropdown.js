import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import theme from "../../theme";
import { convertHexToRGBA } from "../../services/utils";
import { useSelector } from "react-redux";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: "0px 4px 15px rgba(141, 147, 155, 0.2)",
    borderRadius: "12px",
    "& .MuiMenu-list": {
      padding: "20px 0px 10px 0px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DSACustomizedDropDown(props) {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{
          color: props.textColor ? props.textColor : theme.palette.primary.main,
          borderRadius: `${theme.shapes.primaryBtnBorderRadius}`,
          backgroundColor: props.btnBackground
            ? props.btnBackground
            : theme.palette.primary.white,
          padding: props.padding ? props.padding : "10px",
          fontSize: `${theme.shapes.primaryBtnFontSize}`,
          fontWeight: "400",
          textTransform: "capitalize",
          border: props.border ? props.border : "1px solid #EBEBF3",
          marginLeft: props.marginSide ? props.marginSide : "15px",
          paddingRight: props.rightPad ? props.rightPad : "10px",
          minWidth: props.minWidth ? props.minWidth : "10px !important",
          "&:hover": {
            backgroundColor: props.backgroundHover
              ? props.backgroundHover
              : appIconColor !== ""
              ? convertHexToRGBA(appIconColor)
              : theme.palette.primary.background_hover,
            color: props.colorHover
              ? props.colorHover
              : appIconColor !== ""
              ? appIconColor
              : theme.palette.primary.green_dark,
          },
        }}
      >
        {props.icon}
        {props.text}
        {props.icon2}
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        className={props.styling ? "replace-media-dropdown" : ""}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.children}
      </StyledMenu>
    </>
  );
}
