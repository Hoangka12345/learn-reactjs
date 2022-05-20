import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import Login from '../../features/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { logout } from '../../features/Auth/UserSlice';

Header.propTypes = {

};

// const styles = {
//     link: {
//         color: '#fff',
//         textDecoration: 'none',
//     }
// }

function Header(props) {
    const Mode = {
        Login: 'login',
        Register: 'register',
    }

    const LoggedInUser = useSelector(state => state.user.current)
    const isLogin = !!LoggedInUser.id
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState(Mode.Login)
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handelLogoutClick = () => {
        dispatch(logout())
        handleMenuClose()
    }

    return (
        <Box className="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <CodeIcon />
                        </IconButton>
                        <Link to='/' className="header__link">
                            <Button>Hoàng Ka</Button>
                        </Link>
                        <NavLink to='/todos' className="header__link">
                            <Button >Todo</Button>
                        </NavLink>
                        <NavLink to='/albums' className="header__link">
                            <Button >Album</Button>
                        </NavLink>
                        <NavLink to='/products' className="header__link">
                            <Button >Product</Button>
                        </NavLink>
                    </Box>
                    <Box>
                        {isLogin ?
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography>{LoggedInUser.fullName}</Typography>
                                    <IconButton
                                        color="inherit"
                                        onClick={handleUserClick}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Box>
                            </>
                            :
                            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose} disableEscapeKeyDown >
                <DialogContent sx={{ position: 'relative' }}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '5px', right: '10px' }}>
                        <CloseIcon />
                    </IconButton>
                    {mode == Mode.Register ? (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(Mode.Login)}>
                                    Already have an account. Login hear
                                </Button>
                            </Box>
                        </>
                    )
                        :
                        (
                            <>
                                <Login closeDialog={handleClose} />
                                <Box textAlign='center'>
                                    <Button color='primary' onClick={() => setMode(Mode.Register)} >
                                        Don't have an account. Register hear
                                    </Button>
                                </Box>
                            </>
                        )
                    }
                </DialogContent>
            </Dialog>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handelLogoutClick}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}

export default Header;