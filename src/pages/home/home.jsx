import React, {memo} from 'react';
import {Grid} from "@mui/material";
import {axiosInstance} from "../../config";
import {useQuery, useQueryClient} from "react-query";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import Loading from "../../components/loading/loading";
import Typography from "@mui/material/Typography";

function Home() {
    const queryClient = useQueryClient()
    const fetchSubjects = async () => {
        const res = await axiosInstance.get('subject/list',
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('user')
                }
            }
        )
        return res
    };

    const {data, status} = useQuery('Subjects', fetchSubjects)
    console.log(data)


    if (status === 'loading') {
        return (
            <Box sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loading/>
            </Box>
        )
    }

    if (status === 'error') {
        return (
            <>
                error
            </>
        )
    }
    if (status === 'success') {
        return (
            <ResponsiveAppBar>
                <Grid container spacing={3} sx={{sm: {justifyContent: 'center'}}}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Typography variant={'span'} sx={{fontSize:'40px',fontWeight:'bold'}}>
                            O‘z bilimingizni sinang!
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>

                    </Grid>
                </Grid>
            </ResponsiveAppBar>
        );
    }
}

export default memo(Home);