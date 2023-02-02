import React, {memo} from 'react';
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";

export const AlertFunction = (setAlert, status, text) => {
    setAlert({open: true, status: status, text: text});
    setTimeout(() => {
        setAlert({open: false, status: "", text: ""});
    }, (text?.length / 8) * 1000);
}

function AlertContent({alert}) {
    return (
        <Box sx={{position: 'absolute', top: '50px', left: '50px', right: '50px'}}>
            {alert.open && (
                <Alert severity={alert.status}>
                    {alert.text}
                </Alert>
            )}
        </Box>
    );
}

export default memo(AlertContent);