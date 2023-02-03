import React, {memo} from 'react';
import ResponsiveAppBar from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import imageAbout from "../../assets/istockphoto-1353786683-612x612.jpg";
import CardMedia from "@mui/material/CardMedia";
import {Typography} from "@mui/material";

function About() {
    return (
        <>
            <ResponsiveAppBar>
                <Box sx={{minHeight: '88vh',marginTop:3}}>
                    <Grid container spacing={2} sx={{justifyContent: 'center',alignItems:'center'}}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{textAlign: 'center'}}>
                            <Box sx={{display:'flex',justifyContent:'center'}}>
                                <CardMedia
                                    component="img"
                                    // height="194"
                                    width="200"
                                    sx={{width: '500px',borderRadius: '50%'}}
                                    image={imageAbout}
                                    alt="Paella dish"
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{textAlign: 'center'}}>
                            <Typography variant={'h4'}>LiderUstoz nima?</Typography>
                            <Typography>
                                Bu o'qituvchi pedagoglarni o'z ustida ishlashi va kelajak avlodlarga yanada yetuk bilim berish salohiyatini oshirish uchun yaratilgan.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ResponsiveAppBar>
            <Footer/>
        </>
    );
}

export default memo(About);