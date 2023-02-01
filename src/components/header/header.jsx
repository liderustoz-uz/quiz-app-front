import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {memo, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function ResponsiveAppBar({children}) {
    const pages = ['Mahsulotlar', 'TestUz haqida'];
    const settings = ['Chiqish'];
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        navigate('/')
    }
    const logIn = () => {
        navigate('/login')
    }

    const signUp = () => {
        navigate('/signup')
    }

    return (
        <>
            <AppBar position="static" sx={{backgroundColor: 'rgba(255,255,255,0)', color: 'black'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ImportContactsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'Nunito,sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TestUz
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
                                                    sx={{fontFamily: 'Nunito,sans-serif',}} onClick={page==='TestUz haqida'?()=>navigate('/about'):''}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <ImportContactsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'Nunito,sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TestUz
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'black', display: 'block', fontFamily: 'Nunito,sans-serif',}}
                                >
                                    <Typography onClick={page==='TestUz haqida'?()=>navigate('/about'):''}>{page}</Typography>
                                </Button>
                            ))}
                        </Box>

                        {(localStorage.getItem('role')&&localStorage.getItem('user')) ? <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                                    <AccountCircleIcon fontSize={'large'}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" sx={{fontFamily: 'Nunito,sans-serif',}}
                                                    onClick={logOut}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box> : <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Button variant={'outlined'} color={'inherit'} onClick={logIn}
                                    sx={{fontWeight: 'bold', fontFamily: 'Nunito,sans-serif'}}>Kirish</Button>
                            <Button variant={'outlined'} color={'inherit'} onClick={signUp}
                                    sx={{fontWeight: 'bold', fontFamily: 'Nunito,sans-serif'}}>Ro'yxatdan
                                o'tish</Button>
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