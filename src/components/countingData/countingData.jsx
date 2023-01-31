import React, {useState} from 'react';
import CountUp from "react-countup";
import Box from "@mui/material/Box";
import ScrollTrigger from "react-scroll-trigger";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";

function CountingData() {
    const [countOn, setCountOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
            <Box sx={{minHeight: '150px', padding: '20px',textAlign:'center'}}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Typography variant={'h5'} sx={{fontFamily: 'Nunito,sans-serif',}}>O'qituvchilar</Typography>
                        {
                            countOn && <CountUp start={0} end={25455} duration={2} delay={0} style={{fontSize:'40px'}}/>
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Typography variant={'h5'} sx={{fontFamily: 'Nunito,sans-serif',}}>Fanlar</Typography>
                        {
                            countOn && <CountUp start={0} end={25} duration={2} delay={0} style={{fontSize:'40px'}}/>
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Typography variant={'h5'} sx={{fontFamily: 'Nunito,sans-serif',}}>Testlar</Typography>
                        {
                            countOn && <CountUp start={0} end={455} duration={2} delay={0} style={{fontSize:'40px'}}/>
                        }
                    </Grid>
                </Grid>
            </Box>
        </ScrollTrigger>
    );
}

export default CountingData;