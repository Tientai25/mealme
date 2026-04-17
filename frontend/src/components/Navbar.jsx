import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar-new">
      <div className="container">
        <div className="navbar-content-new">
          <Link to="/" className="logo-new" onClick={closeMenu}>
            <div className="logo-icon">¥</div>
            <span className="logo-text">MealMe</span>
          </Link>

          {user && (
            <form className="search-bar" onSubmit={handleSearch}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
          
          <button 
            className="hamburger" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
            <span className={isMenuOpen ? 'active' : ''}></span>
          </button>

          <div className={`nav-links-new ${isMenuOpen ? 'active' : ''}`}>
            {user ? (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="nav-link">{t.nav.dashboard}</Link>
                <Link to="/suggest" onClick={closeMenu} className="nav-link">{t.nav.explore || 'Explore'}</Link>
                <Link to="/weekly-plan" onClick={closeMenu} className="nav-link">{t.nav.planner || 'Planner'}</Link>
                <Link to="/favorites" onClick={closeMenu} className="nav-link">{t.nav.favorites}</Link>
                
                <Link to="/settings" onClick={closeMenu} className="settings-icon">
                  ⚙️
                </Link>

                <div className="user-menu-new" ref={dropdownRef}>
                  <button 
                    className="user-avatar-btn" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <img 
                      src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.username + '&background=2d5016&color=fff'} 
                      alt={user.username}
                    />
                    <div className="user-info">
                      <span className="user-name">{user.username}</span>
                      <span className="user-role">Pro Chef</span>
                    </div>
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="dropdown-menu-new">
                      <Link to="/settings" onClick={() => { closeMenu(); setIsDropdownOpen(false); }}>
                        <span className="icon">⚙️</span>
                        {t.nav.settings}
                      </Link>
                      <button onClick={handleLogout}>
                        <span className="icon">🚪</span>
                        {t.nav.logout}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                  {t.auth.login}
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  {t.auth.signUp}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
