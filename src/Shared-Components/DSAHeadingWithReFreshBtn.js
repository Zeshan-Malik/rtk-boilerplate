import React, { useState } from 'react'
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Stack } from '@mui/system';
import theme from '../../theme';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DTModal from '../../components/Custom/DSAModal'
import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';


const DSAHeadingAndRefresh = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.primary.pageHeadingColor,
  fontSize: theme.shapes.page_heading,
  letterSpacing: '0.15px',
  display: "block",
  fontWeight: 600,
}));

const DSAHeadingWithReFreshBtn = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Stack flexDirection={'row'} alignItems={'center'} {...props}>
        <DSAHeadingAndRefresh m={5} {...props}>
          {props.text}
        </DSAHeadingAndRefresh>
        {!props.hideRefresh && <RefreshIcon sx={{
          background: `${theme.palette.primary.background_hover}`,
          color: `${theme.palette.primary.green_dark}`,
          padding: '10px',
          marginLeft: '10px',
          borderRadius: `10px`,
          width: '22px',
          height: '22px',
          boxShadow: props.dropShadow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
        }} />}
        {!props.hideHelp && <QuestionMarkIcon onClick={() => { setOpenDialog(true) }} sx={{
          background: `${theme.palette.primary.background_hover}`,
          color: `${theme.palette.primary.green_dark}`,
          padding: '10px',
          marginLeft: '10px',
          borderRadius: `10px`,
          width: '22px',
          height: '22px',
          boxShadow: props.dropShadow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
        }} />}
        <DTModal open={openDialog} dialogStateHandle={setOpenDialog} hideModalActionBtn heading sx={{
          "& .MuiDialog-paper": {
            maxWidth: '80vw',
            width: '80vw',
            maxHeight: '80vh !important',
            height: '80vh !important',
            padding: '20px'
          }
        }}>
          <Grid conatiner>
            
          </Grid>
        </DTModal>
      </Stack>
    </>
  )
}

export default DSAHeadingWithReFreshBtn