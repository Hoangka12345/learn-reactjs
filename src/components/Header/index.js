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

import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import Login from '../../features/Auth/components/Login';

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

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Register)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBackdropClick = (event) => {
        //these fail to keep the modal open
        event.stopPropagation();
        return false;
    };

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
                    </Box>
                    <Box>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit" onClick={handleClickOpen}>Register</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose} disableEscapeKeyDown disableBackdropClick={handleBackdropClick}>
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
        </Box>
    );
}

export default Header;