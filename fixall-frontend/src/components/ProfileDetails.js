import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const ProfileDetails = () => {
  const username = localStorage.getItem('username');
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${username}`)
      .then(res => {
        setUser(res.data);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || ''
        });
      })
      .catch(err => console.error('Error fetching user profile:', err));
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/users/${username}`, formData);
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-card-wrapper">
      <div className="profile-card">
        <h2>👤 Profile Details</h2>

        {editMode ? (
          <>
            <label>
              Name:
              <input name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Phone:
              <input name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <div className="button-group">
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setEditMode(false)}>❌ Cancel</button>
            </div>
          </>
        ) : (
          <table>
            <tbody>
              <tr>
                <td><strong>Username:</strong></td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{user.name || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{user.phone || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        )}

        {!editMode && <button  className="edit-btn" onClick={() => setEditMode(true)}>✏️ Edit</button>}
      </div>
    </div>
  );
};

export default ProfileDetails;
