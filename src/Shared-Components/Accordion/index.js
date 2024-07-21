import { styled } from "@mui/material/styles";
import {
    AccordionSummary,
  } from "@mui/material";
export const CustomAccordionSummary = styled((props) => (
    <AccordionSummary {...props} />
  ))(({ theme }) => ({
    borderRadius: `${theme.shapes.primaryBtnBorderRadius}`,
    height: "55px",
    minHeight:"55px",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.background_hover}`,
      color: `${theme.palette.primary.green_dark}`,
      fontWeight: "bold",
    },
    "&:focus": {
      color: `${theme.palette.primary.green_dark}`,
      fontWeight: "bold",
      background: `${theme.palette.primary.background_hover}`,
    },
    "&:active": {
      color: `${theme.palette.primary.green_dark}`,
      fontWeight: "bold",
      background: `${theme.palette.primary.background_hover}`,
    },
    "& .Mui-selected": {
      background: `${theme.palette.primary.green_dark} !important`,
      color: `${theme.palette.primary.background_hover}`,
    },
  }));