import { useState } from 'preact/hooks';

import { useAuth } from '../../context/AuthContext';
import { NavButton, FormCard } from '../../components';
import style from './style.css';

const initialUserData = {
  email: '',
  username: '',
  password: ''
}
const isEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const registerUser = async (e) => {
    if (isEmail(userData.email) && userData.username && userData.password) {
      e.preventDefault();
      const success = await register(userData);
      if (!success) {
        setError(true);
        setUserData(prevData => ({ ...prevData, email: '', password: '' }));
      }
    }
  }


  const handleForm = (e) => {
    setError(false);
    setUserData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  }


  return (
    <FormCard>
      <h1>SLOPEER</h1>
      <h2>CREATE AN ACCOUNT</h2>
      <form onChange={handleForm} onSubmit={registerUser}>
        <input type='text' name='email' value={userData.email} placeholder='Email' />
        <input type='text' name='username' value={userData.username} placeholder='Username' />
        <input type='password' name='password' value={userData.password} placeholder='Password' />
        {error ? <p>Email already registered!</p> :
          <button type='submit'>Register</button>
        }
      </form>
      <center>
        <h3>— OR —</h3>
        <NavButton text={'Log in'} to={'/login'} class={style.login} />
      </center>
    </FormCard>
  )
}


export default Register;
