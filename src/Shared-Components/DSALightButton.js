import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import theme from "../../theme";

const DSALightBTN = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.lightbtnTextColor,
  borderRadius: theme.shapes.primaryBtnBorderRadius,
  background: theme.palette.primary.lightbtnBackgroundColor,
  fontSize: theme.shapes.primaryBtnFontSize,
  fontWeight: '400',
  textTransform: 'capitalize',
  border: '1px solid #EBEBF3',
  padding: '10px 20px',
  "&:disabled": {
    backgroundColor: theme.palette.primary.yellow_with_opacity,
  }
}));


const DSALightButton = (props) => {
  return (
    <DSALightBTN {...props}>
      {props.children}
      {props.text}
    </DSALightBTN>
  )
}

export default DSALightButton