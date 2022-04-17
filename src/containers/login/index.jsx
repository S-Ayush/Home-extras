import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import authBg from '../../assets/images/houses.jpeg';
import http from '../../framework/rest-api/http';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import Overlay from '../../components/ui/overlay';
import { useAuth } from '../../contexts/auth';
import { loginUser } from '../../framework/rest-api/actions';
import './styles.css';

function LoginPage() {
  const { setUser, setToken } = useAuth();

  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target;

    loginUser({ email: email.value, password: password.value })
      .then(res => {
        http.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        setToken(res.data.token);
        setUser(res.data.user);
      })
      .catch(ex => {
        toast.error(ex.response?.data || ex.message);
      });
  };

  return (
    <div className="auth-wrapper">
      <img alt="Auth Bg" loading="eager" className="auth-bg" src={authBg} />
      <Overlay show />

      <form className="auth-form" onSubmit={handleLogin}>
        <h4>Login</h4>
        <Input
          name="email"
          placeholder="Enter your email"
          style={{ marginBottom: '20px' }}
        />
        <Input
          name="password"
          placeholder="Enter your password"
          style={{ marginBottom: '100px' }}
          type="password"
        />
        <Button style={{ width: '100%' }}>Login</Button>
        <Link to="/register">Create an account</Link>
      </form>
    </div>
  );
}

export default LoginPage;
