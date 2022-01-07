import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import { Link, useNavigate } from 'react-router-dom';

const BottomNav = () => {

    const navigate = useNavigate()

    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ margin: '20px auto' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Trang chủ" icon={<GridViewSharpIcon />} onClick={() => navigate('/')} />
                <BottomNavigationAction label="Sản phẩm" icon={<CategoryOutlinedIcon />} onClick={() => navigate('/products')} />
                <BottomNavigationAction label="Thông tin người dùng" icon={<PersonOutlineSharpIcon />} onClick={() => navigate('/profiles')} />
            </BottomNavigation>
        </Box>
    );
}

export default BottomNav