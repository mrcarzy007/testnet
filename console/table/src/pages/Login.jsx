import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/global.css';
function Login() {
  const [user, setUser] = useState({ registrationNo: '', dob: '' });

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw await res.json();

      const data = await res.json();

      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error', error);

      alert('Something went Wroung');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='container'>
        <h3>Login Page</h3>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            name='registrationNo'
            placeholder='Registration No'
            onChange={handleChange}
            value={user.registrationNo}
            required
          />
          <input
            type='date'
            name='dob'
            placeholder='Date of birth'
            onChange={handleChange}
            value={user.dob}
            required
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
