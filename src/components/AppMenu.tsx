import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'
import IconDashboard from '@mui/icons-material/Dashboard'
import IconShoppingCart from '@mui/icons-material/ShoppingCart'
import IconPeople from '@mui/icons-material/People'
import IconBarChart from '@mui/icons-material/BarChart'
import IconLibraryBooks from '@mui/icons-material/LibraryBooks'

import { createStyles, makeStyles } from '@mui/styles'

import React, { useState } from 'react'

const AppMenu = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    function handleClick() {
        setOpen(!open)
    }

    return (
        <List component="nav" className={classes.appMenu} disablePadding>
            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconDashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconPeople />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconBarChart />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button onClick={handleClick} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconLibraryBooks />
                </ListItemIcon>
                <ListItemText primary="Nested Pages" />
                {open ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button className={classes.menuItem}>
                        <ListItemText inset primary="Nested Page 1" />
                    </ListItem>
                    <ListItem button className={classes.menuItem}>
                        <ListItemText inset primary="Nested Page 2" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) =>
    createStyles({
        appMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

export default AppMenu
