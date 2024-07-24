import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DSAPrimaryButton from "./DSAPrimaryButton";
import theme from "../Config/theme";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

export const CustomModalForm = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shapes.borderRadius,
}));

//Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shapes.primaryBtnBorderRadius,
    background: "#FBFBFB !important",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiBackdrop-root": {
    background: "rgba(0,0,0,0.2)",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children } = props;
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  // onClose: PropTypes.func.isRequired,
};
//Modal End
function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  )
}
const DTModal = (props) => {
  const handleClose = () => {
    props.dialogStateHandle(false);
    if(props.resetFieldsCall){
      props.resetFields();
    }
  };
  return (
    <BootstrapDialog
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      {...props}
      PaperComponent={props.drag ? PaperComponent : ''}
    >
      <CustomModalForm>
        <Grid container sx={{ display: props.display?props.display:"" }}>
          <Grid
            item
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            xs={props.filter ? 6 : 8}
          >
            <h3>{props.heading}</h3>

            <h3>{props.icon}</h3>
          </Grid>

          {props.closebtn ? (
            props.closeBtn
          ) : (
            <Grid
              item
              xs={props.filter ? 6 : 4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <h3 style={{ marginRight: "2vh" }}>{props.filter}</h3>
              <h3 style={{ marginRight: "2vh" }}>{props.lastUpdate}</h3>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ p: 0 }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        {props.children}
        {!props.hideModalActionBtn && (
          <Grid
            display={"flex"}
            alignItems={"end"}
            container
            sx={{ mb: 2, height: "7vh" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {props.leftbtn && (
                <DSAPrimaryButton
                  onClick={handleClose}
                  sx={{
                    background: props.leftbtnbackgroundcolor
                      ? props.leftbtnbackgroundcolor
                      : theme.palette.primary.lightbtnBackgroundColor,
                    color: theme.palette.primary.lightbtnTextColor,
                    fontSize: theme.shapes.small_heading,
                    marginRight: "15px",
                    padding: "7px 15px",
                  }}
                >
                  {props.leftbtn}
                </DSAPrimaryButton>
              )}

              {!props.hideRightBtn && (
                <DSAPrimaryButton
                  type="submit"
                  sx={{
                    fontSize: theme.shapes.small_heading,
                    background: props.rightbtnbackgroundcolor
                      ? props.rightbtnbackgroundcolor
                      : theme.palette.primary.green_dark,
                    color: theme.palette.primary.white,
                    padding: "7px 18px",
                  }}
                  onClick={() => {
                    props.exectueRequest();
                  }}
                  disabled={props.disabled ? props.disabled : false}
                >
                  {props.rightbtn}
                </DSAPrimaryButton>
              )}
              {props.mostrightbtn && (
                <DSAPrimaryButton
                  type="submit"
                  sx={{
                    fontSize: theme.shapes.small_heading,
                    background: props.rightbtnbackgroundcolor
                      ? props.rightbtnbackgroundcolor
                      : theme.palette.primary.green_dark,
                    color: theme.palette.primary.white,
                    marginLeft: "12px",
                  }}
                  onClick={() => {
                    props.exectueRequestMostRightBtn();
                  }}
                >
                  {props.mostrightbtn}
                </DSAPrimaryButton>
              )}
            </Grid>
          </Grid>
        )}
      </CustomModalForm>
    </BootstrapDialog>
  );
};

export default DTModal;
