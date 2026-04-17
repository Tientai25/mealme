import { createContext, useState, useEffect } from 'react';
import { getTranslation } from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'vi';
  });

  const [t, setT] = useState(getTranslation(language));

  useEffect(() => {
    localStorage.setItem('language', language);
    setT(getTranslation(language));
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
