import './App.css';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './views/Layout';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Single" element={<Single />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
