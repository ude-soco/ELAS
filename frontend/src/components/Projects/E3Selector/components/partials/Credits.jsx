/* Credits Filter Field */

import React from "react";
import { Grid } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';

export default function Credits(props) {
    return (
        <Grid item>
            <TextField
                label="E3 Credits needed:"
                defaultValue={props.filterState.credits}
                type="number"
                InputProps={{
                    shrink: true,
                    inputProps: {
                        min: 1,
                        max: 10
                    }
                }}
                onChange={(e) => props.action("credits", e.target.value)}
            />
        </Grid>

    );
}
