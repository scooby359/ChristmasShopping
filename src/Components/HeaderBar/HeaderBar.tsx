import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


interface HeaderBarProps {}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {

  const navigate = useNavigate();

  const onHome = () => {
    navigate('/');
  }

  return (
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={onHome}>
            Christmas
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default HeaderBar;