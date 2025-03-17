import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AxiosConnect } from '../connect/axios.connect';

function GetUserDetails() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserDetails(null);
    try {
      const response = await AxiosConnect.get('/api/twitter/user', { params: { username } });
      setUserDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Get User Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input 
          type="text"
          placeholder="Enter your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full max-w-md p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
        >
          {loading ? 'Loading...' : 'Get Details'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {userDetails && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">User Details</h2>
          <p><strong>Name:</strong> {userDetails.data.name}</p>
          <p><strong>Username:</strong> {userDetails.data.username}</p>
          <p><strong>Created at:</strong> {userDetails.data.created_at}</p>
          <p><strong>User ID:</strong> {userDetails.data.id}</p>
          <p>
            <strong>Followers:</strong>{' '}
            {userDetails.data.public_metrics.followers_count}
          </p>
        </div>
      )}
      <Link to="/" className="mt-6 text-blue-300 underline">
        Back to Home
      </Link>
    </div>
  );
}

export default GetUserDetails;
