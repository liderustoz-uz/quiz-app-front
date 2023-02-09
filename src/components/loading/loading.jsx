import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {memo} from "react";

function Loading() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress color={'inherit'} />
        </Box>
    );
}

export default memo(Loading);