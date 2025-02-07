import { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) return;

    (async () => {
      try {
        const { registrationNo } = JSON.parse(storedUser);

        const res = await fetch(
          `http://localhost:5000/api/dashboard/${registrationNo}`
        );

        if (!res.ok) throw await res.json();

        const data = await res.json();

        if (data.user) setUser(data.user);
        else throw new Error('No User Found!');
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          alert(error.message);
        }
      }
    })();
  }, []);

  return (
    <div className='container'>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>
            <strong>Registration No:</strong> {user.registrationNo}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile Number:</strong> {user.mobileNumber}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dob}
          </p>
          <p>
            <strong>Address:</strong> {user.address1}, {user.address2}
            , {user.district}, {user.state}, {user.pincode}
          </p>
          <p>
            <strong>Qualification:</strong> {user.qualification}
          </p>
          <p>
            <strong>Passout Year:</strong> {user.passoutYear}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
