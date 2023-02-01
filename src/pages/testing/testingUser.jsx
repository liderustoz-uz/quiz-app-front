import React, {memo, useEffect, useState} from 'react';
import {axiosInstance} from "../../config";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Footer from "../../components/footer/footer";
import {useSelector} from "react-redux";
import {getDataRedux, roleUserHandleTest} from "../../redux/actions/actions";

function TestingUser() {
    const {roleUserTests} = useSelector(state => state)
    console.log(roleUserTests)
    const [result, setResult] = useState(0);
    const params = useParams()
    useEffect(() => {
        const getData = async () => {
            try {
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
                let array = [];
                response?.data?.forEach((question, index) => {
                    array.push({
                        id: question.id,
                        question: question.question,
                        isWorked: false,
                        variants: []
                    })
                    question?.variants?.forEach(d => {
                        array[index].variants.push({
                            isTrue: d.isTrue,
                            clicked: false,
                            text: d.text,
                            code: d.code,
                            isDesible: false
                        })
                    })
                })
                getDataRedux(array)
            } catch (e) {
                console.log(e)
            }

        }
        localStorage.getItem('role') === 'ROLE_USER' && getData()
    }, [])

    const resultFunction = () => {
        console.log(roleUserTests)
        roleUserTests.forEach(d => {
            d.isWorked &&
            d.variants.forEach(item => {
               return  item.clicked ? (item.isTrue ? setResult(result + 1) : setResult(result)) : result;
            })
        })
    }
    const hundleVariant = (id, code) => {
        roleUserHandleTest({id: id, code: code})
        resultFunction()
    }
    return (
        <>
            <ResponsiveAppBar>
                <Typography variant={'h4'} sx={{
                    textAlign: 'center',
                    marginBottom: 3,
                    fontFamily: 'Nunito,sans-serif',
                }}>{params.subject}</Typography>
                <Typography variant={'h4'} sx={{
                    textAlign: 'center',
                    marginBottom: 3,
                    fontFamily: 'Nunito,sans-serif',
                }}>{result} / {roleUserTests.length}</Typography>
                <Box sx={{
                    border: '1px solid #f3f3f3',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(86,86,86,0.15)',
                    borderRadius: 2,
                    padding: 2,
                    minHeight: '77vh'
                    // gap: 3
                }}>

                    {
                        roleUserTests ? <Box sx={{
                                // border: '1px solid #f3f3f3',
                                display: 'flex',
                                flexDirection: 'column',
                                // backgroundColor: 'rgba(86,86,86,0.15)',
                                borderRadius: 2,
                                // padding: 2,
                                gap: 3,
                                marginBottom: '20px'
                            }}>
                                {
                                    roleUserTests && roleUserTests?.map((item, index) => (
                                        <Box key={item.id}
                                             sx={{border: '1px solid grey', borderRadius: 2, padding: 1}}>
                                            <Box sx={{
                                                marginBottom: '10px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Typography sx={{
                                                    // textAlign: 'center',
                                                    fontSize: '24px',
                                                    padding: 1,
                                                    borderRadius: 2,
                                                    fontFamily: 'Nunito,sans-serif',
                                                }}>{index + 1}.{item.question}</Typography>
                                            </Box>
                                            <Box>
                                                {
                                                    item?.variants?.map((variant) => (
                                                        <Button sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            padding: 1,
                                                            width: '100%',
                                                            borderRadius: 1,
                                                            border: '0.5px solid grey',
                                                            alignItems: 'center',
                                                            transition: 'all .3s',
                                                            fontFamily: 'Nunito,sans-serif',
                                                            marginBottom: 2,
                                                            color: 'black',
                                                            backgroundColor: variant.clicked ? (variant.isTrue ? '#85fc66' : '#ff6161') : 'none',
                                                            "&:hover": {
                                                                backgroundColor: 'rgba(86,86,86,0.23)'
                                                            },
                                                        }}
                                                                disabled={variant.isDesible}
                                                                onClick={() => hundleVariant(item.id, variant.code)}>
                                                            <Typography
                                                                sx={{textAlign: 'center'}}>{variant.text}</Typography>
                                                        </Button>
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                    ))
                                }

                            </Box> :
                            <Typography sx={{textAlign: 'center'}} color={'error'}>Test mavjud emas</Typography>
                    }

                </Box>
            </ResponsiveAppBar>
            <Footer/>
        </>
    );

}

export default memo(TestingUser);