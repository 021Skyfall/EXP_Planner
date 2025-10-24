import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🎯 EXP Planner</h1>
        </Link>
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            홈
          </Link>
          <Link 
            to="/expenses" 
            className={`nav-link ${location.pathname === '/expenses' ? 'active' : ''}`}
          >
            지출 관리
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
