import React from 'react'
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

const DTLabel = styled(FormLabel)(({ theme }) => ({
    color: theme.palette.primary.inputFieldLabelColor,
    fontSize:theme.shapes.inputFieldLabel,
    letterSpacing: '0.15px',
    display:"inline-flex",
    marginBottom:"9px",
    lineHeight:"13px",
}));
const DTTextFieldLabel = (props) => {
  return (
    <DTLabel {...props}>
        {props.children}
    </DTLabel>
  )
}

export default DTTextFieldLabel