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
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditQuestionModal({open, setOpen, handleSubmit}) {
    console.log(open)
    const handleClose = () => setOpen({open:false,obj:null});

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
                            <Typography variant={"h5"} sx={{textAlign: 'center'}}>Savol qo'shish</Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="question"
                                label="Savol"
                                name="question"
                                defaultValue={open?.obj?.question}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="variant1"
                                label="Variant-1 to'g'ri javob"
                                name="variant1"
                                defaultValue={open?.obj?.variants[0].text}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="variant2"
                                label="Variant-2"
                                name="variant2"
                                defaultValue={open?.obj?.variants[1].text}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                // required
                                fullWidth
                                id="variant3"
                                label="Variant-3"
                                name="variant3"
                                defaultValue={open?.obj?.variants[2].text}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                // required
                                fullWidth
                                id="variant4"
                                label="Variant-4"
                                name="variant4"
                                defaultValue={open?.obj?.variants[3].text}
                                autoFocus
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Saqlash
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}