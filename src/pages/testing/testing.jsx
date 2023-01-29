import React, {memo} from 'react';
import {axiosInstance} from "../../config";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Loading from "../../components/loading/loading";

function Testing() {
    const params = useParams()
    const fetchTest = async () => {
        const response = await axiosInstance.post('test/random-tests', {
                subjectId: params?.id,
                count: 10
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('user')
                }
            }
        )
        return response
    };

    const {data, status} = useQuery('Test', fetchTest)
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
                <Typography variant={'h4'} sx={{textAlign: 'center', marginY: 3}}>{params.subject}</Typography>
                {
                    data.data.length > 0 ? <Box sx={{
                        border: '1px solid #f3f3f3',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'rgba(86,86,86,0.15)',
                        borderRadius: 2,
                        padding: 2,
                        gap: 3
                    }}>
                        {
                            data.data.map((item, index) => (
                                <Box key={item.id}
                                     sx={{border: '1px solid black', borderRadius: 2, padding: 1}}>
                                    <Typography variant={'p'} sx={{
                                        textAlign: 'center',
                                        fontSize: '24px',
                                    }}>{index + 1}.{item.question}</Typography>
                                    <Box>
                                        {
                                            item.variants.map((variant) => (
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'start',
                                                    padding: 1,
                                                    borderRadius: 1,
                                                    alignItems: 'center',
                                                    transition: 'all .3s',
                                                    cursor: 'pointer',
                                                    "&:hover": {
                                                        backgroundColor: 'rgba(86,86,86,0.23)'
                                                    }
                                                }}>
                                                    <Typography sx={{textAlign: 'center'}}>{variant.text}</Typography>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            ))
                        }

                    </Box> : <Typography sx={{textAlign: 'center'}} color={'error'}>Test mavjud emas</Typography>
                }
            </ResponsiveAppBar>
        );
    }
}

export default memo(Testing);