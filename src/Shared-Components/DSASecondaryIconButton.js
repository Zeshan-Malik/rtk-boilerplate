import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const DSASecondaryBTN = (props) => {
  const currentUser = []
  const userSelectedTheme = []

  let themeObj = currentUser?.length !== 0 ? userSelectedTheme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;

  const DSASecondaryBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.white,
    borderRadius: theme.shapes.primaryBtnBorderRadius,
    backgroundColor:
      appIconColor !== "" ? appIconColor : theme.palette.primary.green_dark,
    fontSize: theme.shapes.primaryBtnFontSize,
    fontWeight: "400",
    textTransform: "capitalize",
    border: "1px solid #EBEBF3",
    "&:hover": {
      backgroundColor:
        appIconColor !== "" ? appIconColor : theme.palette.primary.green_dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.primary.yellow_with_opacity,
    },
  }));

  return (
    <DSASecondaryBtn {...props}>
      {props.icon}
      {props.children}
      {props.text}
    </DSASecondaryBtn>
  );
};

export default DSASecondaryBTN;
