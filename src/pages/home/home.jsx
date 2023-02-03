import React, {memo} from 'react';
import {Grid} from "@mui/material";
import {axiosInstance} from "../../config";
import {useQuery, useQueryClient} from "react-query";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import Loading from "../../components/loading/loading";
import Typography from "@mui/material/Typography";
import imageHome from '../../assets/121-1213245_how-to-set-use-man-reading-books-svg.png'
import CardMedia from "@mui/material/CardMedia";
import Footer from "../../components/footer/footer";
import CountingData from "../../components/countingData/countingData";

function Home() {
    const queryClient = useQueryClient()
    // const fetchSubjects = async () => {
    //     const res = await axiosInstance.get('subject/list',
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem('user')
    //             }
    //         }
    //     )
    //     return res
    // };
    //
    // const {data, status} = useQuery('Subjects', fetchSubjects)
    // console.log(data)


    // if (status === 'loading') {
    //     return (
    //         <Box sx={{
    //             minHeight: '100vh',
    //             width: '100%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center'
    //         }}>
    //             <Loading/>
    //         </Box>
    //     )
    // }
    //
    // if (status === 'error') {
    //     return (
    //         <>
    //             error
    //         </>
    //     )
    // }

    // if (status === 'success') {
    return (
        <>
            <ResponsiveAppBar>
                <Box sx={{maxWidth: '1440px', mx: 'auto'}}>
                    <Grid container sx={{
                        sm: {justifyContent: 'center'},
                        minHeight: '90vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0',
                        paddingX: '30px'
                    }}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{display: 'block',}}>
                            <Typography variant={'span'} sx={{display: 'block', fontSize: '40px', fontWeight: 'bold'}}>
                                O‘z bilimingizni sinang!
                            </Typography>
                            <Typography variant={'span'}>
                                LiderUstoz – bu o‘qituvchilarni tayyorgarlik ko‘rishi uchun sinov platformasidir.
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <CardMedia
                                component="img"
                                // height="194"
                                width={"600"}
                                image={imageHome}
                                alt="Paella dish"
                            />
                        </Grid>
                    </Grid>
                </Box>
                <CountingData/>
            </ResponsiveAppBar>
            <Footer/>
        </>

    );
    // }
}

export default memo(Home);