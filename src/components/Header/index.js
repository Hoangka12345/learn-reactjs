import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';

Header.propTypes = {

};

// const styles = {
//     link: {
//         color: '#fff',
//         textDecoration: 'none',
//     }
// }

function Header(props) {
    const [open, setOpen] = React.useState(false);

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

                <DialogContent>
                    <Register closeDialog={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Header;