import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const [user, setUser] = useState({ username: '', id: '' });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const id = params.get('id');
    if (username && id) {
      setUser({ username, id });
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user.username ? (
        <div>
          <p className="mb-2">
            Signed in as: <span className="font-semibold">{user.username}</span>
          </p>
          <p className="mb-4">
            User ID: <span className="font-semibold">{user.id}</span>
          </p>
          <div className="space-y-4">
            <Link
              to={`/verify-follow?username=${user.username}&id=${user.id}`}
              className="bg-green-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition block text-center"
            >
              Verify Follow
            </Link>
            <Link
              to={`/verify-retweet?username=${user.username}&id=${user.id}`}
              className="bg-green-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition block text-center"
            >
              Verify Retweet
            </Link>
            <Link
              to={`/verify-smart-follower?username=${user.username}&id=${user.id}`}
              className="bg-green-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition block text-center"
            >
              Verify Smart Follower
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
