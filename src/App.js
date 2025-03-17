import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VerifyFollow from './pages/VerifyFollow';
import VerifyRetweet from './pages/VerifyRetweet';
import VerifySmartFollower from './pages/VerifySmartFollower';
import TelegramLogin from './pages/telegramlogin';
import GetUserDetails from './pages/GetUserDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/telegram" element={<TelegramLogin />} />
        <Route path="/verify-follow" element={<VerifyFollow />} />
        <Route path="/user" element={<GetUserDetails />} />
        <Route path="/verify-retweet" element={<VerifyRetweet />} />
        <Route path="/verify-smart-follower" element={<VerifySmartFollower />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
