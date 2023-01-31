import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TelegramIcon from '@mui/icons-material/Telegram';
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

function Footer() {
    return (
        <Box sx={{minHeight: '200px', padding: '20px',backgroundColor:'rgb(0,0,0)',color:'white'}}>
            <Typography variant={'h4'} sx={{textAlign: 'center',marginBottom:'20px',fontFamily: 'Nunito,sans-serif',}}>Bizning telegram kanallar</Typography>
            <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography sx={{fontFamily: 'Nunito,sans-serif',}}>Shoxida Xomidova</Typography>
                        <IconButton sx={{
                            '&:hover':{
                                transform:'scale(1.2)',
                                transition:'all .3s'
                            }
                        }} color={'inherit'} onClick={() => window.open(`https://t.me/xomidovashohida`)}>
                            <TelegramIcon/>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography sx={{fontFamily: 'Nunito,sans-serif',}}>Shahzoda Qodirova</Typography>
                        <IconButton sx={{
                            '&:hover':{
                                transform:'scale(1.1)',
                                transition:'all .3s'
                            }
                        }} color={'inherit'} onClick={() => window.open(`https://t.me/namShahzoda`)}>
                            <TelegramIcon/>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography sx={{fontFamily: 'Nunito,sans-serif',}}>Naima Xusanova</Typography>
                        <IconButton sx={{
                            '&:hover':{
                                transform:'scale(1.1)',
                                transition:'all .3s'
                            }
                        }} color={'inherit'} onClick={() => window.open(`https://t.me/kelajakkabirqadam_1`)}>
                            <TelegramIcon/>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;