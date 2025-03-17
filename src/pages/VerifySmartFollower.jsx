import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AxiosConnect } from '../connect/axios.connect';

function VerifySmartFollower() {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [user, setUser] = useState({ username: '', id: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const minFollowers = 50;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const id = params.get('id');
    if (username && id) {
      setUser({ username, id });
    }
  }, [location]);

  const handleVerifySmartFollower = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosConnect.get('/api/twitter/check-smart-follower', {
        params: { userId: user.id, minFollowers },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Verify Smart Follower</h1>
      <p className="mb-4">Signed in as: {user.username}</p>
      <button
        onClick={handleVerifySmartFollower}
        disabled={isLoading}
        className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        {isLoading ? 'Verifying...' : 'Verify Smart Follower'}
      </button>
      {result && (
        <div className="mt-4">
          {result.isSmartFollower ? (
            <p className="text-green-400 font-bold">You are a smart follower!</p>
          ) : (
            <p className="text-red-400 font-bold">You are NOT a smart follower.</p>
          )}
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <Link to="/dashboard" className="mt-6 text-blue-300 underline">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default VerifySmartFollower;
