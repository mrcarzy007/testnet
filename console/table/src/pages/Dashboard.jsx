import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { registrationNo } = JSON.parse(storedUser);

      fetch(`http://localhost:5000/api/dashboard/${registrationNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            console.error("User not found");
          }
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p><strong>Registration No:</strong> {user.registrationNo}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Address:</strong> {user.address1}, {user.address2}, {user.district}, {user.state}, {user.pincode}</p>
          <p><strong>Qualification:</strong> {user.qualification}</p>
          <p><strong>Passout Year:</strong> {user.passoutYear}</p>
          <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>
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
