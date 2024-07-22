import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getGraphsData } from "./dashboardSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await dispatch(getGraphsData())
        console.log("response****", response)
    }

    return (<>
        <Grid

        >
            <Typography sx={{ margin: '0px auto', fontSize: '30px' }}>
                Boilerplate contains
            </Typography>
            <Typography>
                React router v6.
                Public Private routing
            </Typography>

            <Typography>
                MUI and theme integration
            </Typography>
            <Typography>
                RTK implementation
            </Typography>
            <Typography>
                Common methods for api calls.
            </Typography>
        </Grid>

    </>)
}

export default Dashboard;