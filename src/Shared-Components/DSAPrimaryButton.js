import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
// import { convertHexToRGBA } from "../../services/utils";

const DSAPrimaryButton = (props) => {
  // --theme implementation----

  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  const userSelectedTheme = useSelector((state) => state.locationplayer.userSelectedTheme);

  let themeObj = currentUser?.length !== 0 ? userSelectedTheme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;



  const DTPrimaryBtn = styled(Button)(({ theme }) => ({
    color: appIconColor !== "" ? appIconColor : theme.palette.primary.main,
    backgroundColor: theme.palette.primary.white,
    padding: theme.spacing(1.2, 1.5),
    fontSize: theme.shapes.primaryBtnFontSize,
    fontWeight: "400",
    textTransform: "capitalize",
    border:"1px solid #EBEBF3",
    borderRadius: theme.shapes.primaryBtnBorderRadius,
    "&:hover": {
      backgroundColor:theme.palette.primary.background_hover,
      color:
        appIconColor !== "" ? appIconColor : theme.palette.primary.green_dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.primary.yellow_with_opacity,
    },
  }));
  return (
    <DTPrimaryBtn {...props}>
      {props.icon}
      {props.children}
    </DTPrimaryBtn>
  );
};

export default DSAPrimaryButton;
