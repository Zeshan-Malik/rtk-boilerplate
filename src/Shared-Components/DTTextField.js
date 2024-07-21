import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { inputLabelClasses } from "@mui/material/InputLabel";

const DTTextFieldInputBase = styled(TextField)(({ theme }) => ({
  background: "transparent",
  color: theme.palette.primary.green_dark,
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100%",
    borderRadius: theme.shapes.borderRadius,
    fontSize: "14px",
    padding: "4px 0 10px",
  },
  "& .Mui-focused": {
    color: "rgba(0, 0, 0, 0.87)",
  },
}));
const DTTextField = (props) => {
  return (
    <DTTextFieldInputBase
      InputLabelProps={{
        sx: {
          [`&.${inputLabelClasses.shrink}`]: {
            color: "#5D953C !important",
          },
        },
      }}
      variant="standard"
      size="standerd"
      InputProps={{
        inputProps: { min: props.min ? props.min : 0, max: props.max },
      }}
      {...props}
      onChange={props.onChange}
      name={props.name}
      placeholder={props.placeholder}
      inputProps={props.inputProps}
      onBlur={props.onBlur}
      defaultValue={props.defaultValue}
    />
  );
};

export default DTTextField;
