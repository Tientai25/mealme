import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="footer">
      <div className="container-new">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-logo">The Curated Table</h3>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <Link to="/privacy">{t.footer.privacyPolicy}</Link>
            <Link to="/terms">{t.footer.termsOfService}</Link>
            <Link to="/contact">{t.footer.contactUs}</Link>
            <span className="footer-copyright">{t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
