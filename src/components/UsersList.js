import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    setLoading(true); 
    setError(''); 

    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users', error);
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]); 
  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user', error);
      setError('Error deleting user. Please try again.');
    }
  };

  return (
    <div className="users-list">
    <h2>Users List</h2>
    {error && <div className="alert alert-danger">{error}</div>} 
  
    {loading ? (
      <div className="loading-indicator">Loading...</div>
    ) : (
      <div className="user-table">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.first_name} className="user-avatar" />
            <div className="user-info">
              <p>{user.first_name} {user.last_name}</p>
              <p>{user.email}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}

  

      <div className="pagination">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages} 
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
