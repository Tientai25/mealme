import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { updateProfile } from '../services/api';
import './Settings.css';

const Settings = () => {
  const { user, setUser } = useContext(AuthContext);
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    goal: user?.goal || 'maintain',
    dislikedFoods: user?.dislikedFoods?.join(', ') || ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dislikedTags, setDislikedTags] = useState(user?.dislikedFoods || []);
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !dislikedTags.includes(tagInput.trim())) {
      setDislikedTags([...dislikedTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setDislikedTags(dislikedTags.filter(t => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('goal', formData.goal);
      data.append('dislikedFoods', dislikedTags.join(','));
      if (avatar) {
        data.append('avatar', avatar);
      }

      const response = await updateProfile(data);
      setUser(response.data.user);
      setMessage(t.common.success);
    } catch (error) {
      setMessage(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setMessage(t.settings.languageChanged || 'Language changed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const goalOptions = {
    lose_weight: t.goals.loseWeight,
    gain_weight: t.goals.gainWeight,
    maintain: t.goals.maintain,
    healthy: t.goals.eatHealthy,
    cheap: t.goals.saveMoney
  };

  return (
    <div className="settings-page-new">
      <div className="settings-container">
        <aside className="settings-sidebar-new">
          <div className="sidebar-header">
            <h2>{t.settings.title}</h2>
            <p>{t.settings.manageAccount}</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              <span>{t.settings.personalInfo}</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <span className="nav-icon">🍴</span>
              <span>{t.settings.foodPreferences}</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'language' ? 'active' : ''}`}
              onClick={() => setActiveTab('language')}
            >
              <span className="nav-icon">🌐</span>
              <span>{t.settings.language}</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <img 
              src={avatarPreview || `https://ui-avatars.com/api/?name=${user?.username}&background=2d5016&color=fff`}
              alt="User"
            />
            <div>
              <p className="footer-name">{user?.username}</p>
              <p className="footer-role">{t.settings.premiumMember || 'Premium Member'}</p>
            </div>
          </div>
        </aside>

        <main className="settings-main">
          {activeTab === 'profile' && (
            <div className="settings-content-new">
              <div className="content-header">
                <h1>{t.settings.personalInfo}</h1>
                <p>{t.settings.updatePhoto}</p>
              </div>

              <div className="content-grid">
                <div className="profile-photo-card">
                  <div className="photo-circle">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" />
                    ) : (
                      <span className="initials">{user?.username?.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <h3>{t.settings.yourProfilePhoto}</h3>
                  <p>{t.settings.photoDescription}</p>
                  <label htmlFor="avatar-upload" className="btn-upload">
                    ⬆️ {t.settings.uploadImage}
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <button className="btn-remove">{t.settings.removePhoto}</button>
                </div>

                <div className="profile-form-card">
                  <div className="form-field">
                    <label>{t.settings.userName}</label>
                    <div className="input-with-icon-right">
                      <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                      <span className="icon-right">✏️</span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>{t.settings.email}</label>
                    <div className="input-with-icon-right">
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <span className="icon-right">@</span>
                    </div>
                  </div>

                  <div className="info-box">
                    <span className="info-icon">ℹ️</span>
                    <p>{t.settings.emailWarning}</p>
                  </div>

                  <div className="form-actions">
                    <button className="btn-save" onClick={handleSubmit} disabled={loading}>
                      {loading ? t.common.loading : t.settings.saveChanges}
                    </button>
                    <button className="btn-cancel">{t.settings.cancel}</button>
                  </div>
                </div>
              </div>

              <div className="member-perk-card">
                <div className="perk-content">
                  <span className="perk-badge">{t.settings.memberPerkBadge || 'MEMBER PERK'}</span>
                  <h3>{t.settings.memberPerk}</h3>
                  <p>{t.settings.memberPerkDesc}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-content-new">
              <div className="content-header">
                <h1>{t.settings.foodPreferences}</h1>
                <p>{t.settings.foodPreferencesDesc}</p>
              </div>

              <div className="preferences-grid">
                <div className="preferences-form">
                  <div className="form-field">
                    <label>{t.settings.eatingGoal}</label>
                    <select 
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="select-field"
                    >
                      {Object.entries(goalOptions).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                    <small>{t.settings.goalHint}</small>
                  </div>

                  <div className="form-field">
                    <label>{t.settings.dislikedFoods}</label>
                    <div className="tag-input-wrapper">
                      <input 
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder={t.settings.dislikedPlaceholder}
                      />
                    </div>
                    <div className="tags-list">
                      {dislikedTags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                          <button onClick={() => removeTag(tag)}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="btn-save" onClick={handleSubmit} disabled={loading}>
                    💾 {loading ? t.common.loading : t.settings.saveChanges}
                  </button>
                </div>

                <div className="preferences-sidebar">
                  <div className="pref-card pref-image">
                    <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" alt="Healthy food" />
                    <div className="pref-overlay">
                      <h4>{t.settings.healthyInspiration}</h4>
                    </div>
                  </div>

                  <div className="pref-stats">
                    <div className="stat-card">
                      <span className="stat-icon">🍃</span>
                      <h3>85%</h3>
                      <p>{t.settings.freshIndex}</p>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">🔥</span>
                      <h3>1.2k</h3>
                      <p>{t.settings.caloriesSaved}</p>
                    </div>
                  </div>

                  <div className="premium-card">
                    <div>
                      <h4>{t.settings.premiumTitle}</h4>
                      <p>{t.settings.premiumDesc}</p>
                    </div>
                    <button className="btn-upgrade">{t.settings.upgrade}</button>
                  </div>
                </div>
              </div>

              <div className="tip-box">
                <span className="tip-icon">💡</span>
                <div>
                  <h4>{t.settings.expertTip}</h4>
                  <p>{t.settings.tipContent}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="settings-content-new">
              <div className="content-header">
                <h1>{t.settings.language}</h1>
                <p>{t.settings.languageDesc}</p>
              </div>

              {message && <div className="success-message-new">{message}</div>}

              <div className="language-grid">
                <div 
                  className={`language-card-new ${language === 'vi' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('vi')}
                >
                  <span className="flag-icon">🇻🇳</span>
                  <div className="lang-info">
                    <h3>{t.settings.vietnamese}</h3>
                    <p>{language === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</p>
                  </div>
                  {language === 'vi' && (
                    <div className="active-indicator">
                      <span className="check-icon">✓</span>
                      <span className="active-text">{t.settings.currentlyActive}</span>
                    </div>
                  )}
                </div>

                <div 
                  className={`language-card-new ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  <span className="flag-icon">🇬🇧</span>
                  <div className="lang-info">
                    <h3>{t.settings.english}</h3>
                    <p>{language === 'en' ? 'United Kingdom' : 'Vương quốc Anh'}</p>
                  </div>
                  {language === 'en' && (
                    <div className="active-indicator">
                      <span className="check-icon">✓</span>
                      <span className="active-text">{t.settings.currentlyActive}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="translation-card">
                <span className="translation-icon">✨</span>
                <div className="translation-content">
                  <h3>{t.settings.smartTranslation}</h3>
                  <p>{t.settings.translationDesc}</p>
                </div>
              </div>

              <div className="coming-soon-card">
                <span className="soon-icon">🔄</span>
                <div>
                  <h4>{t.settings.moreSoon}</h4>
                  <p>{t.settings.moreSoonDesc}</p>
                </div>
              </div>

              <div className="language-footer">
                <button className="btn-reset">{t.settings.resetToDefault}</button>
                <button className="btn-save" onClick={() => setMessage(t.common.success)}>{t.settings.savePreferences}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
