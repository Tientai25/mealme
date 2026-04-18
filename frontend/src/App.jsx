import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SuggestMeal from './pages/SuggestMeal';
import Favorites from './pages/Favorites';
import MealDetail from './pages/MealDetail';
import DailyPlan from './pages/DailyPlan';
import WeeklyPlan from './pages/WeeklyPlan';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/suggest" element={<ProtectedRoute><SuggestMeal /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="/meal/:id" element={<MealDetail />} />
              <Route path="/daily-plan" element={<ProtectedRoute><DailyPlan /></ProtectedRoute>} />
              <Route path="/weekly-plan" element={<ProtectedRoute><WeeklyPlan /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
            <Footer />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
