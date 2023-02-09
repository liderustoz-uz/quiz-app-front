import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditSubjectModal({open, setOpen, handleSubmit}) {
    const handleClose = () => setOpen({open: false, id: null, text: ''});

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open.open}>
                    <Box sx={style}>
                        <Box component="form" noValidate
                             onSubmit={handleSubmit}
                             sx={{mt: 1}}>
                            <Typography variant={"h5"} sx={{textAlign: 'center'}}>Fan o'zgartirish</Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="subject"
                                label="Fan"
                                name="subject"
                                autoFocus
                                defaultValue={open.text}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                O'zgartirish
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}