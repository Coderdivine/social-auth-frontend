import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AxiosConnect } from '../connect/axios.connect';

function VerifyLike() {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [user, setUser] = useState({ username: '', id: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const tweetId = '1890720087558033663';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const id = params.get('id');
    if (username && id) {
      setUser({ username, id });
    }
  }, [location]);

  const handleVerifyLike = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosConnect.get('/api/twitter/check-likes', {
        params: { tweetId, userId: user.id },
      });
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Verify Tweet Like</h1>
      <p className="mb-4">Signed in as: {user.username}</p>
      <button
        onClick={handleVerifyLike}
        disabled={isLoading}
        className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        {isLoading ? 'Verifying...' : 'Verify Like'}
      </button>
      {result && (
        <div className="mt-4">
          {result.hasRetweeted ? (
            <p className="text-green-400 font-bold">
              You have liked the tweet!
            </p>
          ) : (
            <p className="text-red-400 font-bold">
              You have NOT liked the tweet.
            </p>
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

export default VerifyLike;
