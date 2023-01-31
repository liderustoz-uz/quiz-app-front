import React, {memo, useState} from 'react';
import {axiosInstance} from "../../config";
import {useQuery, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Loading from "../../components/loading/loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateQuestionModal from "../../components/createQuestionModal/createQuestionModal";
import EditQuestionModal from "../../components/editQuestionModal/editQuestionModal";
import DeleteQuestionModal from "../../components/deleteQuestionModal/deleteQuestionModal";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Footer from "../../components/footer/footer";

function Testing() {
    const params = useParams()
    const queryClient = useQueryClient()
    const [questionCreateModal, setQuestionCreateModal] = useState(false)
    const [questionEditModal, setQuestionEditModal] = useState({open: false, obj: null})
    const [questionDeleteModal, setQuestionDeleteModal] = useState({open: false, id: null})
    const [variantsBackground, setVariantsBackground] = useState(false)
    const [clickedVariants, setClickedVariants] = useState(false)
    const [clickedIndex, setClickedIndex] = useState({father: null, children: null})
    const fetchTest = async () => {
        if (localStorage.getItem('role') === 'ROLE_ADMIN') {
            const response = await axiosInstance.post('test/subject', {
                    subjectId: params.id
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user')
                    }
                }
            )
            return response
        } else {
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
        }

    };

    const {data, status} = useQuery('Test', fetchTest)
    console.log(data)

    const handleOpenCreateQuestionModal = () => setQuestionCreateModal(true);
    const handleCreateQuestionSubmit = async (event) => {
        event?.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData)
        try {
            const res = await axiosInstance.post('test', {
                    subjectId: parseInt(params.id),
                    question: formData.get('question'),
                    variants: [
                        {
                            text: formData.get('variant1'),
                            isTrue: true
                        },
                        {
                            text: formData.get('variant2'),
                            isTrue: false
                        },
                        formData.get('variant3').length > 0 && {
                            text: formData.get('variant3'),
                            isTrue: false
                        },
                        formData.get('variant4').length > 0 && {
                            text: formData.get('variant4'),
                            isTrue: false
                        },
                    ]
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user')
                    }
                })

            console.log(res)
            queryClient.invalidateQueries('Test')
        } catch (e) {
            console.log(e);
        }

        setQuestionCreateModal(false)
        console.log({
            subjectId: parseInt(params.id),
            question: formData.get('question'),
            variants: [
                {
                    text: formData.get('variant1'),
                    isTrue: true
                },
                {
                    text: formData.get('variant2'),
                    isTrue: false
                },
                formData.get('variant3').length > 0 ? {
                    text: formData.get('variant3'),
                    isTrue: false
                } : null,
                formData.get('variant4').length > 0 ? {
                    text: formData.get('variant4'),
                    isTrue: false
                } : null
            ]
        })
    };

    const handleEditQuestionSubmit = async (event) => {
        event?.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData)
        try {
            const res = await axiosInstance.put('test', {
                    id: questionEditModal.obj.id,
                    subjectId: params.id,
                    question: formData.get('question'),
                    variants: [
                        {
                            text: formData.get('variant1'),
                            isTrue: true
                        },
                        {
                            text: formData.get('variant2'),
                            isTrue: false
                        },
                        {
                            text: formData.get('variant3'),
                            isTrue: false
                        },
                        {
                            text: formData.get('variant4'),
                            isTrue: false
                        },
                    ]
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user')
                    }
                })
            console.log(res)
            queryClient.invalidateQueries('Test')
        } catch (e) {
            console.log(e);
        }

        setQuestionEditModal({open: false, obj: null})
    };

    const handleDeleteSubjectSubmit = async () => {
        try {
            const res = await axiosInstance.delete('test?id=' + questionDeleteModal.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('user')
                }
            })
            console.log(res)
            queryClient.invalidateQueries('Test')
        } catch (e) {
            console.log(e);
        }
        setQuestionDeleteModal({open: false, id: null})
    };

    const hundleVariant = (boolen, index, indexIn) => {
        console.log(boolen)
        setVariantsBackground(boolen)
        setClickedVariants(true)
        setClickedIndex({father: index, children: indexIn})
    }

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
            <>
                <ResponsiveAppBar>
                    <Typography variant={'h4'} sx={{
                        textAlign: 'center',
                        marginBottom: 3,
                        fontFamily: 'Nunito,sans-serif',
                    }}>{params.subject}</Typography>
                    <Box sx={{
                        border: '1px solid #f3f3f3',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'rgba(86,86,86,0.15)',
                        borderRadius: 2,
                        padding: 2,
                        minHeight:'77vh'
                        // gap: 3
                    }}>
                        {
                            data.data.length > 0 ? <Box sx={{
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
                                        data.data.map((item, index) => (
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
                                                    {
                                                        localStorage.getItem('role') === 'ROLE_ADMIN' &&
                                                        <Box sx={{display: 'flex', gap: 2}}>
                                                            <Button variant={'outlined'} color={'warning'}
                                                                    onClick={() => setQuestionEditModal({
                                                                        open: true,
                                                                        obj: item,
                                                                    })}>
                                                                <EditIcon/>
                                                            </Button>
                                                            <Button variant={'outlined'} color={'error'}
                                                                    onClick={() => setQuestionDeleteModal({
                                                                        open: true,
                                                                        id: item.id,
                                                                    })}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </Box>
                                                    }
                                                </Box>
                                                <Box>
                                                    {
                                                        item.variants.map((variant, indexIn) => (
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
                                                                backgroundColor: clickedVariants && (index === clickedIndex.father) && (indexIn === clickedIndex.children) ? (variantsBackground ? '#85fc66' : '#ff6161') : 'none',
                                                                "&:hover": {
                                                                    backgroundColor: clickedVariants && (index === clickedIndex) ? (variantsBackground ? '#85fc66' : '#ff6161') : 'rgba(86,86,86,0.23)'
                                                                },
                                                            }} disabled={clickedVariants && (index === clickedIndex.father)}
                                                                    onClick={() => hundleVariant(variant.isTrue, index, indexIn)}>
                                                                <Typography
                                                                    sx={{textAlign: 'center'}}>{variant.text}</Typography>
                                                                {localStorage.getItem('role') === 'ROLE_ADMIN' && variant.isTrue &&
                                                                    <AssignmentTurnedInIcon color={'success'}/>
                                                                }
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
                        {
                            localStorage.getItem('role') === 'ROLE_ADMIN' &&
                            <>
                                <Box
                                    sx={{
                                        border: '1px solid grey',
                                        borderRadius: 2,
                                        padding: 1,
                                        minHeight: '50px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f2f2f2',
                                        cursor: 'pointer',
                                        color: 'gray',
                                        "&:hover": {
                                            backgroundColor: 'rgba(86,86,86,0.14)'
                                        },
                                        transition: 'all 0.3s'
                                    }}
                                    onClick={handleOpenCreateQuestionModal}
                                >
                                    <AddIcon fontSize={'large'}/>
                                </Box>
                                <CreateQuestionModal setOpen={setQuestionCreateModal} open={questionCreateModal}
                                                     handleSubmit={handleCreateQuestionSubmit}/>
                                <EditQuestionModal setOpen={setQuestionEditModal} open={questionEditModal}
                                                   handleSubmit={handleEditQuestionSubmit}/>
                                <DeleteQuestionModal setOpen={setQuestionDeleteModal} open={questionDeleteModal}
                                                     handleSubmit={handleDeleteSubjectSubmit}/>
                            </>
                        }
                    </Box>
                </ResponsiveAppBar>
                <Footer/>
            </>
        );
    }
}

export default memo(Testing);