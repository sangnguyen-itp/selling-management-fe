import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const ProfileBar = () => {
    return (
        <Box display='flex' justifyContent='space-between'>
            <Box display='flex' justifyContent='space-between'>
                <Avatar alt="L" src="/admin_icon.png" />
            </Box>
        </Box>
    )
}

export default ProfileBar
