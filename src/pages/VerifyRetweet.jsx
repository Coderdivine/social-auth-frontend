import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AxiosConnect } from '../connect/axios.connect';

function VerifyRetweet() {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [user, setUser] = useState({ username: '', id: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const farmingTweetId = '1721920447208411325';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const id = params.get('id');
    if (username && id) {
      setUser({ username, id });
    }
  }, [location]);

  const handleVerifyRetweet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosConnect.get('/api/twitter/check-retweet', {
        params: { tweetId: farmingTweetId, userId: user.id },
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
      <h1 className="text-3xl font-bold mb-4">Verify Retweet</h1>
      <p className="mb-4">Signed in as: {user.username}</p>
      <button
        onClick={handleVerifyRetweet}
        disabled={isLoading}
        className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        {isLoading ? 'Verifying...' : 'Verify Retweet'}
      </button>
      {result && (
        <div className="mt-4">
          {result.hasRetweeted ? (
            <p className="text-green-400 font-bold">You have retweeted the farming tweet!</p>
          ) : (
            <p className="text-red-400 font-bold">You have NOT retweeted the farming tweet.</p>
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

export default VerifyRetweet;
