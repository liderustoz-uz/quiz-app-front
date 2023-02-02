import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {memo, useState} from 'react';
import {axiosInstance} from "../../config";
import AlertContent, {Alert, AlertFunction} from "../../components/alert/alert";


const theme = createTheme();

const SignUp = () => {

    const navigate = useNavigate()
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [alert, setAlert] = useState({open: false, text: "", status: ""});

    const symbolsUp = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const symbolsLow = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const symbolsNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbolsCharts = ["~", "!", "@", "#", "$", "%", "^", "&", "*"];
    const symbolUpercaseFunction = (str) => {
        for (let i = 0; i < symbolsUp.length; i++) {
            if (str.includes(symbolsUp[i])) {
                return true
            }
        }
    }

    const symbolLowercaseFunction = (str) => {
        for (let i = 0; i < symbolsLow.length; i++) {
            if (str.includes(symbolsLow[i])) {
                return true
            }
        }
    }

    const symbolNumbersFunction = (str) => {
        for (let i = 0; i < symbolsNum.length; i++) {
            if (str.includes(symbolsNum[i])) {
                return true
            }
        }
    }

    const symbolChartsFunction = (str) => {
        for (let i = 0; i < symbolsCharts.length; i++) {
            if (str.includes(symbolsCharts[i])) {
                return true
            }
        }
    }

    const password = (str) => {
        return symbolUpercaseFunction(str) && symbolLowercaseFunction(str) && symbolNumbersFunction(str) && symbolChartsFunction(str)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('firstName').trim().length > 0) {
            setFirstNameError(false)
            if (data.get('lastName').trim().length > 0) {
                setLastNameError(false)
                if (data.get('userName').trim().length >= 4 && data.get('userName').trim().length <= 10) {
                    setUserNameError(false)
                    if (password(data.get('password')) && data.get('password').length > 8) {
                        setPasswordError(false);
                        try {
                            const res = await axiosInstance.post('auth/signup', {
                                firstName: data.get('firstName'),
                                lastName: data.get('lastName'),
                                username: data.get('userName'),
                                password: data.get('password'),
                            })
                            navigate("/subjects")
                            localStorage.setItem('user', res.data.token)
                        } catch (e) {
                            console.log(e);
                            // setError(true);
                        }
                    } else {
                        setPasswordError(true);
                        // AlertFunction(setAlert, "warning", "Parol son, harf, katta harf, \"!,@,#...\" va belgilar soni 8 dan ziyot bulishi kerak")
                    }
                } else {
                    setUserNameError(true)
                    // AlertFunction(setAlert, "warning", 'Tahallus 4 dan ko\'p 10 dan kam bo\'lishi kerak')
                }
            } else {
                setLastNameError(true)
                // AlertFunction(setAlert, "warning", 'Familya kiritilmagan')
            }
        } else {
            setFirstNameError(true)
            // AlertFunction(setAlert, "warning", 'Ism kiritilmagan')
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
                {/*        backgroundImage: 'url(https://source.unsplash.com/random?signup)',*/}
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
                        {/*<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>*/}
                        {/*    <LockOutlinedIcon/>*/}
                        {/*</Avatar>*/}
                        <Typography component="h1" variant="h4">
                            Ro'yxatdan o'tish
                        </Typography>
                        <Box component="form" noValidate
                             onSubmit={handleSubmit}
                             sx={{mt: 5}} style={{maxWidth: "360px"}}>
                            <TextField
                                margin="normal"
                                required
                                error={firstNameError}
                                helperText={firstNameError&&'Ism kiritilmagan'}
                                fullWidth
                                id="firstName"
                                label="Ism"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                error={lastNameError}
                                helperText={lastNameError&&'Familya kiritilmagan'}
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Familya"
                                type="lastName"
                                autoComplete="lastName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={userNameError}
                                helperText={userNameError&&'Tahallus 4 dan ko\'p 10 dan kam bo\'lishi kerak'}
                                name="userName"
                                label="Foydalanuvchi nomi"
                                type="text"
                                id="userName"
                                autoComplete="userName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={passwordError}
                                helperText={passwordError&&"Parol son, harf, katta harf, \"!,@,#...\" va belgilar soni 8 dan ziyot bulishi kerak"}
                                name="password"
                                label="Parol"
                                // type="password"
                                type="text"
                                id="password"
                                autoComplete="current-password"
                            />

                            {/*{error && <Typography component="p" variant="p"*/}
                            {/*                      style={{textAlign: 'center', marginTop: "12px", color: "#dc3545"}}>*/}
                            {/*    Could not sign in with the provided credentials.*/}
                            {/*</Typography>}*/}

                            <Button
                                type="submit"
                                fullWidth
                                color={'inherit'}
                                variant="outlined"
                                sx={{mt: 3, mb: 2}}
                            >
                                Ro'yxatdan o'tish
                            </Button>
                            <Grid container
                                  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="" color={'inherit'} variant="body2" onClick={() => navigate('/login')}>
                                        Accountingiz bormi ? Kirish
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

export default memo(SignUp)