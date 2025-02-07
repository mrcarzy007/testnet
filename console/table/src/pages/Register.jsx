import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/global.css';

const init = {
  applicationid: '',
  registrationNo: '',
  name: '',
  mobileNumber: '',
  dob: '',
  email: '',
  address1: '',
  address2: '',
  district: '',
  state: '',
  pincode: '',
  qualification: '',
  passoutYear: '',
};

const generateRegistrationNumber = () => {
  return 'REG' + Math.floor(1000000 + Math.random() * 900000000);
};

export default function Register() {
  const [user, setUser] = useState(init);

  const navigate = useNavigate();

  const handleRegistrationFocus = () => {
    if (!user.registrationNo) {
      setUser((prev) => ({
        ...prev,
        registrationNo: generateRegistrationNumber(),
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user.registrationNo) {
      alert(
        'Please Generate a Registration number by Clicking on the inputs fields '
      );

      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw await res.json();

      navigate('/login');
    } catch (error) {
      console.log('Error', error);
      alert('Something went Roung!');
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
        <h3>Data Table Set</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='applicationid'
            placeholder='Application ID'
            value={user.applicationid}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='registrationNo'
            onFocus={handleRegistrationFocus}
            placeholder='Registration No'
            value={user.registrationNo}
            onChange={handleChange}
            required
            readOnly
          />
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='mobileNumber'
            placeholder='Mobile Number'
            value={user.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type='date'
            name='dob'
            placeholder='Date of Birth'
            value={user.dob}
            onChange={handleChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='address1'
            placeholder='Address line 1'
            value={user.address1}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='address2'
            placeholder='Address line 2'
            value={user.address2}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='district'
            placeholder='District'
            value={user.district}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='state'
            placeholder='State'
            value={user.state}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='pincode'
            placeholder='PinCode'
            value={user.pincode}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='qualification'
            placeholder=' Higest Qualification'
            value={user.qualification}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='passoutYear'
            placeholder='Passout year'
            value={user.passoutYear}
            onChange={handleChange}
            required
          />
          <button type='Submit'>Register</button>
        </form>
      </div>
    </>
  );
}
