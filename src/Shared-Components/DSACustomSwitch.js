import React from "react";
import Switch from '@mui/material/Switch';
import DSAToolTip from "./DSAToolTip";

const DSACustomSwitch = (props) => {
    return (<>
        <DSAToolTip title={props.toolTipTittle} placement={props.toolTipPlacement}>
            <Switch
                sx={{
                    marginLeft: '20px'
                }}
                checked={props.checked}
                onChange={props.handleChange}
                color="success"
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </DSAToolTip>
    </>)
}

export default DSACustomSwitch;