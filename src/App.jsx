import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CreateRequest from './pages/CreateRequest';
import RequestDetail from './pages/RequestDetail';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AICenter from './pages/AICenter';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/request/:id" element={<RequestDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ai-center" element={<AICenter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
