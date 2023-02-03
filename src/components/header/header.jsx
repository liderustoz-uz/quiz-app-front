import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {memo, useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/logo.jpg"


function ResponsiveAppBar({children}) {
    const pages = ['Biz haqimizda',];
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        navigate('/')
    }


    return (
        <>
            <AppBar position="static" sx={{backgroundColor: 'rgba(255,255,255,0)', color: 'black'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex',alignItems: 'center'},
                                fontFamily: 'Nunito,sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        <img style={{width:'40px',marginRight:5}} src={logo} alt="logo"/>
                            LiderUstoz
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, color: 'black'}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'}, fontFamily: 'Nunito,sans-serif',
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center"
                                                    sx={{fontFamily: 'Nunito,sans-serif',}}
                                                    onClick={() => navigate('/about')}>{page}</Typography>
                                    </MenuItem>
                                ))}
                                {
                                    localStorage.getItem('user') &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center"
                                                    sx={{fontFamily: 'Nunito,sans-serif',}}
                                                    onClick={() => navigate('/subjects')}>Fanlar</Typography>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none',alignItems: 'center'},
                                flexGrow: 1,
                                fontFamily: 'Nunito,sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img style={{width:'40px',marginRight:5}} src={logo} alt="logo"/>
                            LiderUstoz
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'black', display: 'block', fontFamily: 'Nunito,sans-serif',}}
                                >
                                    <Typography
                                        onClick={() => navigate('/about')}>{page}</Typography>
                                </Button>
                            ))}
                            {
                                localStorage.getItem('user') &&
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'black', display: 'block', fontFamily: 'Nunito,sans-serif',}}>
                                    <Typography textAlign="center"
                                                sx={{fontFamily: 'Nunito,sans-serif',}}
                                                onClick={() => navigate('/subjects')}>Fanlar</Typography>
                                </Button>
                            }
                        </Box>

                        {(localStorage.getItem('role') && localStorage.getItem('user')) ?
                            <Button variant={'outlined'} color={'inherit'} onClick={logOut}
                                    sx={{fontWeight: 'bold', fontFamily: 'Nunito,sans-serif'}}>Chiqish</Button> :
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Button variant={'outlined'} color={'inherit'} onClick={()=>navigate('/login')}
                                        sx={{fontWeight: 'bold', fontFamily: 'Nunito,sans-serif'}}>Kirish</Button>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{padding: '12px', paddingTop: '24px'}}>
                {children}
            </Box>
        </>


    );
}

export default memo(ResponsiveAppBar);