import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DSACustomizedCheckbox from "./DSACheckBox";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { convertHexToRGBA } from "../../services/utils";

export default function DSATags(props) {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;
  return (
    <Box
      sx={{
        border:
          appIconColor !== ""
            ? `1px solid ${convertHexToRGBA(appIconColor)}`
            : "1px solid #EBEBF3",
        borderRadius: theme.shapes.primaryBtnBorderRadius,
        padding: "3px 18px 3px 4px",
        marginLeft: "10px",
        width: "fit-content",
        background: theme.palette.primary.white,
      }}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <DSACustomizedCheckbox
        value={props.value}
        name={props.name}
        checked={props.checked}
        handleChange={props.handleChange}
      />
      <Typography
        sx={{
          fontSize: "13px",
          color: "#2D2D2D",
        }}
      >
        {props.children}
      </Typography>
    </Box>
  );
}
