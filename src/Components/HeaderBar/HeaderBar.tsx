import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useFileService } from '../../Services/useFileService';

interface HeaderBarProps {}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { exportToJson } = useFileService();

  const navigate = useNavigate();

  const onHome = () => {
    handleCloseMenu();
    navigate('/');
  };

  const onAll = () => {
    handleCloseMenu();
    navigate('/all');
  };

  const onTodo = () => {
    handleCloseMenu();
    navigate('/todo');
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onExportData = () => {
    handleCloseMenu();
    exportToJson();
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          onClick={handleOpenMenu}
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
          onClick={onHome}
        >
          Christmas Shopping
        </Typography>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={onHome}>Home</MenuItem>
          <MenuItem onClick={onTodo}>To Do</MenuItem>
          <MenuItem onClick={onAll}>All</MenuItem>
          <MenuItem onClick={onExportData}>Export Data</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
