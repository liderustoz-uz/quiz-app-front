import React, {memo} from 'react';
import {axiosInstance} from "../../config";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import ResponsiveAppBar from "../../components/drawer/drawer";
import {Typography} from "@mui/material";

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
            <>
                ...loading
            </>
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
                    <Typography variant={'h4'} sx={{textAlign:'center'}}>{params.subject}</Typography>
                </ResponsiveAppBar>
        );
    }
}

export default memo(Testing);