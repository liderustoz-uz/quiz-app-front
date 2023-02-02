import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {memo, useState} from 'react';
import {axiosInstance} from "../../config";
import {signInSuccess} from "../../redux/actions/actions";
import AlertContent, {AlertFunction} from "../../components/alert/alert";

const theme = createTheme();

const Login = () => {
    const navigate = useNavigate()
    const [alert, setAlert] = useState({open: false, text: "", status: ""});


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const res = await axiosInstance.post('auth/signin', {
                username: data.get('userName'),
                password: data.get('password'),
            })
            navigate("/subjects")
            signInSuccess(res.data.token)
            localStorage.setItem('user', res.data.token)
            localStorage.setItem('role', res.data.user.role)
        } catch (e) {
            console.log(e);
            e.response.message === 'username_already_taken' && AlertFunction(setAlert, "warning", "Bu foydalanuvchi nomi allaqachon olingan")
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                {/*<Grid*/}
                {/*    item*/}
                {/*    xs={false}*/}
                {/*    sm={4}*/}
                {/*    md={7}*/}
                {/*    sx={{*/}
                {/*        backgroundImage: 'url(https://source.unsplash.com/random?login)',*/}
                {/*        backgroundRepeat: 'no-repeat',*/}
                {/*        backgroundColor: (t) =>*/}
                {/*            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],*/}
                {/*        backgroundSize: 'cover',*/}
                {/*        backgroundPosition: 'center',*/}
                {/*    }}*/}
                {/*/>*/}
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/*<Avatar sx={{m: 1}}>*/}
                        {/*    <LockOutlinedIcon/>*/}
                        {/*</Avatar>*/}
                        <Typography component="h1" variant="h4">
                            Kirish
                        </Typography>
                        <Box component="form" noValidate
                             onSubmit={handleSubmit}
                             sx={{mt: 5}} style={{maxWidth: "360px"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="Foydalanuvchi nomi"
                                name="userName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Parol"
                                name="password"
                                // type="password"
                                // autoFocus
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color={'inherit'}
                                sx={{mt: 3, mb: 2}}
                            >
                                Kirish
                            </Button>
                            <Grid container
                                  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {/*Forgot your password?*/}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" color={'inherit'}
                                          onClick={() => navigate('/signup')}>
                                        Ro'yxatdan o'tish
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <AlertContent alert={alert}/>
        </ThemeProvider>
    );
}

export default memo(Login)