import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea} from '@mui/material';
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ActionAreaCard({subject, handleOpenDeleteSubjectModal, handleOpenEditSubjectModal}) {
    console.log(subject)
    const navigate = useNavigate()
    return (
        <Card sx={{
            borderRadius: 1.5,
            '&:hover': {transform: 'scale(1.025)'},
            transition: 'all .3s',
            backgroundColor: '#f2f2f2'
        }}
              onClick={localStorage.getItem('role') === 'ROLE_USER' ? () => navigate(`/test/${subject.name}/${subject.id}`) : null}>
            <CardActionArea>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}
                                onClick={localStorage.getItem('role') !== 'ROLE_USER' ? () => navigate(`/test/${subject.name}/${subject.id}`) : null}>
                        {subject.name}
                    </Typography>
                    {
                        localStorage.getItem('role') === 'ROLE_ADMIN' &&
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button onClick={() => handleOpenEditSubjectModal(subject.id, subject.name)}
                                    color={'warning'}><EditIcon/></Button>
                            <Button onClick={() => handleOpenDeleteSubjectModal(subject.id)}
                                    color={'error'}><DeleteIcon/></Button>
                        </Box>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default memo(ActionAreaCard);