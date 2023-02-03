import React, {memo, useState} from 'react';
import ActionAreaCard from "../../components/card/card";
import {Grid} from "@mui/material";
import {axiosInstance} from "../../config";
import {useQuery, useQueryClient} from "react-query";
import ResponsiveAppBar from "../../components/header/header";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import CreateSubjectModal from "../../components/createSubjectModal/createSubjectModal";
import DeleteSubjectModal from "../../components/deleteSubjectModal/deleteSubjectModal";
import EditSubjectModal from "../../components/editSubjectModal/editSubjectModal";
import Loading from "../../components/loading/loading";
import Footer from "../../components/footer/footer";

function Subjects() {
    const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false)
    const [openDeleteSubjectModal, setOpenDeleteSubjectModal] = useState({open: false, id: null})
    const [openEditSubjectModal, setOpenEditSubjectModal] = useState({open: false, id: null, text: ''})
    const queryClient = useQueryClient()

    const {data, status} = useQuery('Subjects', async () => {
        return await axiosInstance.get('subject/list',
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('user')
                }
            }
        )
    })

    const handleOpenCreateSubjectModal = () => setOpenCreateSubjectModal(true);
    const handleOpenDeleteSubjectModal = (id) => setOpenDeleteSubjectModal({open: true, id: id});
    const handleOpenEditSubjectModal = (id, text) => setOpenEditSubjectModal({open: true, id: id, text: text});
    const handleCreateSubjectSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            await axiosInstance.post('subject', {
                    name: data.get('subject'),
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user')
                    }
                })
            queryClient.invalidateQueries('Subjects')
        } catch (e) {
            console.log(e);
        }
        setOpenCreateSubjectModal(false)
    };

    const handleDeleteSubjectSubmit = async () => {
        try {
            axiosInstance.delete('subject?id=' + openDeleteSubjectModal.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('user')
                }
            })
            queryClient.invalidateQueries('Subjects')
        } catch (e) {
            console.log(e);
        }
        setOpenDeleteSubjectModal({open: false, id: null})
    };

    const handleEditSubjectSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            await axiosInstance.put('subject', {
                    id: openEditSubjectModal.id,
                    name: data.get('subject'),
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('user')
                    }
                })
            queryClient.invalidateQueries('Subjects')
        } catch (e) {
            console.log(e);
        }
        setOpenEditSubjectModal({open: false, id: null, text: ''})
    };

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
                    <Box sx={{minHeight:'90vh'}}>
                        <Grid container spacing={3} sx={{sm: {justifyContent: 'center'}}}>
                            {
                                data?.data?.map((item) => (
                                    <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
                                        <ActionAreaCard subject={item}
                                                        handleOpenDeleteSubjectModal={handleOpenDeleteSubjectModal}
                                                        handleOpenEditSubjectModal={handleOpenEditSubjectModal}/>
                                    </Grid>
                                ))
                            }
                            {
                                localStorage.getItem('role') !== 'ROLE_USER' ? <Grid item lg={3} md={4} sm={6} xs={12}>
                                    <Box onClick={handleOpenCreateSubjectModal}
                                         sx={{
                                             borderRadius: 1.5,
                                             '&:hover': {transform: 'scale(1.025)'},
                                             transition: 'all .3s',
                                             backgroundColor: '#f2f2f2',
                                             minHeight: '108.01px',
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             color: 'rgba(0,0,0,0.59)',
                                             boxShadow: 1
                                         }}>
                                        <AddIcon fontSize={'large'}/>
                                    </Box>
                                    <CreateSubjectModal open={openCreateSubjectModal} setOpen={setOpenCreateSubjectModal}
                                                        handleSubmit={handleCreateSubjectSubmit}/>
                                    <DeleteSubjectModal open={openDeleteSubjectModal} setOpen={setOpenDeleteSubjectModal}
                                                        handleSubmit={handleDeleteSubjectSubmit}/>
                                    <EditSubjectModal open={openEditSubjectModal} setOpen={setOpenEditSubjectModal}
                                                      handleSubmit={handleEditSubjectSubmit}/>
                                </Grid> : ''
                            }

                        </Grid>
                    </Box>
                </ResponsiveAppBar>
                <Footer/>
            </>
        );
    }
}

export default memo(Subjects);