import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '../store';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const login = async (email) => {
    dispatch(setAuth(email));
    navigate('/movie-finder');
  };
  const logout = async () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return { auth, login, logout };
};
