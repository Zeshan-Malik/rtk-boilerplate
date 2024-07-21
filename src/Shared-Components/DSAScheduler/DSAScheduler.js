import "./style.css";
import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useState } from "react";
import { TextField, Button, DialogActions } from "@mui/material";
import { Box, Grid, Typography } from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import theme from "../../../theme";
import DSACustomizedDropDown from "../DSADropdown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";

const DSAScheduler = () => {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;
  const CustomEditor = (scheduler) => {
    const event = scheduler.edited;

    // Make your own form/state
    const [state, setState] = useState({
      title: event?.title || "",
      description: event?.description || "",
    });
    const [error, setError] = useState("");

    const handleChange = (value, name) => {
      setState((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };
    const handleSubmit = async () => {
      // Your own validation
      if (state.title.length < 3) {
        return setError("Min 3 letters");
      }

      try {
        scheduler.loading(true);

        /**Simulate remote data saving */
        const added_updated_event = await new Promise((res) => {
          /**
           * Make sure the event have 4 mandatory fields
           * event_id: string|number
           * title: string
           * start: Date|string
           * end: Date|string
           */
          setTimeout(() => {
            res({
              event_id: event?.event_id || Math.random(),
              title: state.title,
              start: scheduler.state.start.value,
              end: scheduler.state.end.value,
              description: state.description,
            });
          }, 3000);
        });

        scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
        scheduler.close();
      } finally {
        scheduler.loading(false);
      }
    };

    return (
      <div>
        <div style={{ padding: "1rem" }}>
          <p>Load your custom form/fields</p>
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={error}
            fullWidth
          />
          <TextField
            label="Description"
            value={state.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            fullWidth
          />
        </div>
        <DialogActions>
          <Button onClick={scheduler.close}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </div>
    );
  };

  const EditScheduler = (scheduler) => {
    return (
      <div style={{ padding: "1rem" }}>
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <Typography
            style={{
              width: "136px",
              height: "24px",
              left: "20px",
              top: "20px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              lineheight: "24px",
            }}
          >
            Lunch - First Part
          </Typography>
          <DSACustomizedDropDown
            border={"0px"}
            padding={"0px"}
            text={""}
            icon={
              <MoreHorizIcon
                sx={{
                  fontSize: "22px",
                  color: appIconColor !== "" ? `${appIconColor}!important` : "",
                }}
              />
            }
          >
            <Grid
              item
              flexDirection={"columns"}
              display={"flex"}
              alignItems={"center"}
              style={{ minWidth: "150px", paddingLeft: "20px" }}
            >
              <Typography>Preview</Typography>
              <Typography>Edit</Typography>
            </Grid>
          </DSACustomizedDropDown>
        </Grid>
        <Grid item mt={1} style={{ display: "flex", fontSize: "12px" }}>
          <spn>
            <b>Playlist:</b> {" " + ` Default`}
          </spn>
        </Grid>
        <Grid item mt={1}>
          <Typography
            style={{
              fontSize: "14px",
              display: "flex",
            }}
          >
            <Box
              style={{
                color: appIconColor !== "" ? `${appIconColor}!important` : "",
              }}
            >
              <AccessTimeIcon style={{ fontSize: "20px" }} mr={0.5} />
            </Box>
            <Box
              style={{
                color: appIconColor !== "" ? `${appIconColor}!important` : "",
              }}
            >{`Duration 01:36:23`}</Box>
          </Typography>
        </Grid>
      </div>
    );
  };

  const EVENTS = [
    {
      event_id: 1,
      title: "Event 1",
      start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
      disabled: false,
      admin_id: [1, 2, 3, 4],
      color: `${appIconColor}`,
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      admin_id: 2,
      color: `${appIconColor}`,
    },
    {
      event_id: 3,
      title: "Event 3",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
      admin_id: 1,
      //   editable: false,
      //   deletable: false
      color: `${appIconColor}`,
    },
    {
      event_id: 4,
      title: "Event 4",
      start: new Date(
        new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
          new Date().getDate() - 2
        )
      ),
      end: new Date(
        new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
          new Date().getDate() - 2
        )
      ),
      admin_id: 2,
      color: `${appIconColor}`,
    },
    {
      event_id: 5,
      title: "Event 5",
      start: new Date(
        new Date(new Date(new Date().setHours(16)).setMinutes(0)).setDate(
          new Date().getDate() - 2
        )
      ),
      end: new Date(
        new Date(new Date(new Date().setHours(17)).setMinutes(0)).setDate(
          new Date().getDate() - 2
        )
      ),
      admin_id: 2,
      editable: true,
      color: `${appIconColor}`,
    },
    {
      event_id: 6,
      title: "Event 6",
      start: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(15)).setMinutes(0)),
      admin_id: 2,
      color: `${appIconColor}`,
    },
  ];

  return (
    <div>
      <Scheduler
        events={EVENTS}
        recourseHeaderComponent={(scheduler) => (
          <CustomEditor scheduler={scheduler} />
        )}
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
        customViewer={(scheduler) => <EditScheduler scheduler={scheduler} />}
        onEventClick={() => console.log("------------->")}
        eventRenderer={(event) => {
          return (
            <div className="event-tittle">
              <p>{event.title}</p>
            </div>
          );
        }}
      />
    </div>
  );
};
export default DSAScheduler;
