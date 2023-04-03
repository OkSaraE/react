import './App.css';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './views/Layout';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import {MediaProvider} from './contexts/MediaContexts';
import Logout from './views/Logout';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Single" element={<Single />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Logout" element={<Logout />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

export default App;
