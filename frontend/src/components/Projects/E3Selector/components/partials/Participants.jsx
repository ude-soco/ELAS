/* Simple two-point slider for selecting participant ranges */

import React, { useState } from "react";
import { Grid } from '@material-ui/core';

import Slider from '@material-ui/core/Slider';

export default function Participants(props) {
    const [value, setValue] = useState(props.filterState.participants);
    return (
        <Grid item>
            <p style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "1rem", transform: "translate(0, 1.5px) scale(0.75)", transformOrigin: "top left"}}>Number of Participants:</p>
            <Slider
                valueLabelDisplay={true}
                value={value}
                onChange={(e, val) => setValue(val)}
                onChangeCommitted={(e, val) => props.action("participants", val) /* doing this onChange is suuuuuper sluggish */}
                min={0}
                max={180}
            />
        </Grid>

    );
}
