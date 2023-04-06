import {createTheme, ThemeProvider} from '@mui/material';
import {useContext, useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContexts';
import {useUser} from '../hooks/apiHooks';
import {ThemeOptions} from '../theme/themeOptions';

const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const user = await getUserByToken(userToken);
      if (user) {
        setUser(user);
        const target = location.pathname === '/' ? '/home' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const theme = createTheme(ThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/Upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
