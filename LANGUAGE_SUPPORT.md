# 🌐 Multi-Language Support - MealMe

## ✅ Language Implementation Complete

MealMe now supports **full bilingual interface** with Vietnamese and English.

## 🎯 What's Been Updated

### All UI Components & Pages Now Support i18n:
- ✅ Navbar with language switcher
- ✅ Footer
- ✅ Home page
- ✅ Authentication (Login/Register)
- ✅ Dashboard
- ✅ Daily Plan
- ✅ Weekly Plan
- ✅ Suggest Meal
- ✅ Favorites
- ✅ Meal Detail
- ✅ Settings (with language selector)
- ✅ Meal Cards

## 🔧 How It Works

### 1. Language Context
The app uses React Context API for language management:
- `LanguageContext` provides current language and translation function
- Language preference is saved in `localStorage`
- Default language: Vietnamese (`vi`)

### 2. Translation Files
Located in `frontend/src/i18n/`:
- `en.js` - English translations
- `vi.js` - Vietnamese translations
- `index.js` - Translation loader

### 3. Usage in Components
```jsx
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const MyComponent = () => {
  const { t, language, changeLanguage } = useContext(LanguageContext);
  
  return (
    <div>
      <h1>{t.dashboard.greeting}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
    </div>
  );
};
```

## 🎨 How to Change Language

### Method 1: Settings Page
1. Go to **Settings** (⚙️ icon in navbar)
2. Click on **Language** tab
3. Select your preferred language:
   - 🇻🇳 Vietnamese (Tiếng Việt)
   - 🇬🇧 English

### Method 2: Programmatically
```javascript
const { changeLanguage } = useContext(LanguageContext);
changeLanguage('en'); // Switch to English
changeLanguage('vi'); // Switch to Vietnamese
```

## 📝 Translation Structure

Translations are organized by feature:

```javascript
{
  auth: { ... },           // Login, Register
  nav: { ... },            // Navigation
  dashboard: { ... },      // Dashboard page
  dailyPlan: { ... },      // Daily meal plan
  weeklyPlan: { ... },     // Weekly meal plan
  suggestMeal: { ... },    // Meal suggestions
  favorites: { ... },      // Favorite meals
  mealDetail: { ... },     // Meal details
  home: { ... },           // Home page
  settings: { ... },       // Settings page
  goals: { ... },          // User goals
  footer: { ... },         // Footer
  common: { ... }          // Common terms
}
```

## 🍜 About Meal Names

**Important Note:** Meal names and descriptions in the database (`meals.json`) are kept in Vietnamese because they represent authentic Vietnamese dishes. When switching to English:
- ✅ All UI labels, buttons, and navigation → English
- ✅ System messages and instructions → English
- 🇻🇳 Meal names (e.g., "Phở bò", "Bánh mì") → Vietnamese (authentic names)

This is intentional to preserve the cultural authenticity of Vietnamese cuisine.

## 🔄 Adding New Translations

### Step 1: Add to Translation Files
Edit `frontend/src/i18n/en.js` and `frontend/src/i18n/vi.js`:

```javascript
// en.js
export const en = {
  myFeature: {
    title: 'My Feature',
    description: 'This is my feature'
  }
};

// vi.js
export const vi = {
  myFeature: {
    title: 'Tính năng của tôi',
    description: 'Đây là tính năng của tôi'
  }
};
```

### Step 2: Use in Component
```jsx
const MyComponent = () => {
  const { t } = useContext(LanguageContext);
  return <h1>{t.myFeature.title}</h1>;
};
```

## 🌍 Supported Languages

Currently supported:
- 🇻🇳 **Vietnamese** (Tiếng Việt) - Default
- 🇬🇧 **English** (United Kingdom)

Coming soon (as mentioned in Settings):
- 🇪🇸 Spanish
- 🇫🇷 French

## 🎯 Language Persistence

- Language choice is automatically saved to `localStorage`
- Persists across browser sessions
- Key: `language`
- Values: `'vi'` or `'en'`

## 🧪 Testing Language Switch

1. Start the app: `npm run dev`
2. Open browser DevTools → Application → Local Storage
3. Check `language` key
4. Change language in Settings
5. Verify all text updates immediately
6. Refresh page - language should persist

## 📱 Mobile Responsive

Language switcher works seamlessly on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile devices

## 🐛 Troubleshooting

### Language not changing?
1. Clear browser cache
2. Check localStorage for `language` key
3. Verify LanguageProvider wraps your app in `App.jsx`

### Missing translations?
1. Check if key exists in both `en.js` and `vi.js`
2. Verify correct path: `t.section.key`
3. Check console for errors

### Text still in Vietnamese when English selected?
- If it's a meal name → This is intentional (authentic Vietnamese dishes)
- If it's UI text → Check if that component uses `t` from LanguageContext

## 🎉 Summary

Your MealMe app now has **complete bilingual support**! Users can seamlessly switch between Vietnamese and English throughout the entire application while maintaining the authentic Vietnamese culinary experience.

---

**Last Updated:** 2024
**Status:** ✅ Fully Implemented
