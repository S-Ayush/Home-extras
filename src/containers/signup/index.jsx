import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import authBg from '../../assets/images/houses.jpeg';
import http from '../../framework/rest-api/http';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import Overlay from '../../components/ui/overlay';
import { registerUser } from '../../framework/rest-api/actions';
import { useAuth } from '../../contexts/auth';

import './styles.css';

function SignupPage() {
  const { setUser, setToken } = useAuth();

  const handleRegister = e => {
    e.preventDefault();
    const { email, password } = e.target;

    registerUser({ email: email.value, password: password.value })
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

      <form className="auth-form" onSubmit={handleRegister}>
        <h4>Register</h4>
        <Input
          name="email"
          placeholder="Enter your email"
          style={{ marginBottom: '20px' }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          style={{ marginBottom: '100px' }}
        />
        <Button style={{ width: '100%' }}>Register</Button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default SignupPage;
