import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const DTTextFieldInputBase = styled(TextField)(({ theme }) => ({
  color: "#2D2D2D",
  borderRadius: theme.shapes.borderRadius,
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100%",
    borderRadius: theme.shapes.borderRadius,
    fontSize: "13px",
    padding: "4px 0 10px",
  },
  "& .MuiInput-root:before": {
    borderBottom: "none",
  },
  "& .MuiInput-root:after": {
    borderBottom: "none",
  },
  "& .Mui-focused": { color: "#333333 !important" },
}));

const DTEmailField = (props) => {
  return (
    <DTTextFieldInputBase
      variant="standard"
      size="small"
      style={{
        border:
          props.touch && props.valid
            ? "2px solid red"
            : props.touch && props.errors == null
              ? "2px solid #A5A944"
              : null,
      }}
      onChange={props.onChange}
      name={props.name}
      placeholder={props.placeholder}
      inputProps={props.inputProps}
      onBlur={props.onBlur}
      defaultValue={props.defaultValue}
      {...props}
    />
  );
};

export default DTEmailField;
