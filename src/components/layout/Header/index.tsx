import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppContext } from '../../../context/AppContext';
import './Header.css';

const Header = () => {
  const { platformInfo } = useAppContext();

  return (
    <header className="header">
      <div className="logo">
        <Link to={ROUTES.HOME}>Marketplace</Link>
      </div>
      <nav className="nav">
        <Link to={ROUTES.CATALOG}>Каталог</Link>
        <Link to={ROUTES.CART}>Корзина</Link>
      </nav>
      <div className="platform-indicator">
        {platformInfo.isTma ? 'TMA' : 'Web'}
      </div>
    </header>
  );
};

export default Header;