import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import getUserAPI from '../api/user/getUser'

import { Response } from '../models/common/Response'
import { GetUserReply } from '../models/user/user.api'
import { getUserAuth, removeUserAuth } from '../storage/auth/auth'

import { makeStyles } from '@mui/styles'
import { IsAuth, setLoginFailed, setUnAuthenticated } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: 20,
    },
    title: {
        flexGrow: 1,
    },
}));


const Navbar = () => {

    //dispatch
    const dispatch = useAppDispatch()

    // state
    const [currentUser, setCurrentUser] = useState<GetUserReply>({ id: '' })
    const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false)

    // handle logout
    const handleCloseLogoutDialog = () => {
        setIsOpenLogoutDialog(false)
    }

    const handleLogout = () => {
        setIsOpenLogoutDialog(false)
        removeUserAuth()
        dispatch(setLoginFailed(''))
    }

    // effect 
    useEffect(() => {
        const getUser = async () => {
            try {
                const userAuth = getUserAuth()
                let userID = ''
                if (!userAuth) {
                    removeUserAuth()
                    dispatch(setLoginFailed(''))
                } else {
                    userID = userAuth.user_id
                }

                const res: any = await getUserAPI({ id: userID })
                let { data } = res as Response

                setCurrentUser(data as GetUserReply)
            } catch (error) {
                const err = error as Response
                if (err.code === 401) {
                    removeUserAuth()
                    dispatch(setUnAuthenticated())
                }
            }
        }

        getUser()
    }, [dispatch])

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <MenuOpenOutlinedIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>

                </Typography>
                <Button color="inherit" onClick={() => setIsOpenLogoutDialog(true)} style={{ paddingBlock: 10 }}>
                    <LockOpenOutlinedIcon titleAccess='Đăng xuất' />
                </Button>
                <Dialog
                    open={isOpenLogoutDialog}
                    onClose={handleCloseLogoutDialog}
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Đăng xuất
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn sẽ đăng xuất khỏi hệ thống. Bạn có chắc không ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseLogoutDialog}>
                            Hủy
                        </Button>
                        <Button onClick={handleLogout}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar