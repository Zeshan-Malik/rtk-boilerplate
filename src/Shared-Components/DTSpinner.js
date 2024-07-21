import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function DTSpinner(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999999,
        pointerEvents: "none",
        display: props.open ? "block" : "none",
      }}
    >
      <CircularProgress
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
}

export default DTSpinner;
