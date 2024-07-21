import { FormControl, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import "../App.css";
import { useSelector } from "react-redux";
const DTSelect = (props) => {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;

  const SelectBox = styled(Select)(({ theme }) => ({
    color: "#6D7A83",
    fontSize: "14px",
    borderRadius: theme.shapes.borderRadius,
    marginLeft: "0 !important",
  }));

  return (
    <FormControl size="small" fullWidth={true} variant="standard">
      {props.label && !props.value && (
        <InputLabel id="demo-simple-select-standard-label">
          {props.label}
        </InputLabel>
      )}
      <SelectBox
        defaultValue={props.defaultValue ? props.defaultValue : ""}
        labelId="demo-simple-select-standard-label"
        displayEmpty
        inputProps={{ ...props }}
        sx={{
          "&:before": {
            borederBottom: "none",
          },
          "&:after": {
            borederBottom: "none",
          },
          "& .Mui-focused": { color: "red !important" },
          fontSize: "14px",
          marginTop: "5px",
        }}
      ></SelectBox>
    </FormControl>
  );
};
export default DTSelect;
