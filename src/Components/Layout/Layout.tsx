import { Outlet } from 'react-router-dom';
import HeaderBar from '../HeaderBar/HeaderBar';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {

  return (
    <div className="layout">
      <HeaderBar />
      <Outlet />
    </div>
  );
};

export default Layout;