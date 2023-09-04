import { useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// store
import { Provider, useSelector } from 'react-redux';
import store from './store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <InAppScope />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
}

const InAppScope = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!auth && pathname !== '/login') {
      navigate('/login');
      return;
    }
    if (!['/movie-finder', '/movie-favorite'].some((path) => path === pathname)) {
      navigate('/movie-finder');
    }
  }, []);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
};
