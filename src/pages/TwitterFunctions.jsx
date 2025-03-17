import React, { useState } from 'react';
import axios from 'axios';

export default function TwitterCheck() {
  const axiosConnect = axios.create({ baseURL: "http://localhost:5000/" });
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [retweetResult, setRetweetResult] = useState(null);
  const [followResult, setFollowResult] = useState(null);
  const [smartFollowerResult, setSmartFollowerResult] = useState(null);
  const [combinedResult, setCombinedResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  const farmingTweetId = '1789965347379892477';
  const farmingProtocolId = 'ChimdiXo';
  const minFollowers = 50;

  const handleCheck = async () => {
    setIsChecking(true);
    setError(null);
    setUserData(null);
    setRetweetResult(null);
    setFollowResult(null);
    setSmartFollowerResult(null);
    setCombinedResult(null);

    try {
      const userRes = await axiosConnect.get('/api/twitter/user', { params: { username } });
      const user = userRes.data.data;
      if (!user || !user.id) throw new Error('User not found');
      setUserData(user);
      const userId = user.id;
      const retweetRes = await axiosConnect.get('/api/twitter/check-retweet', {
        params: { tweetId: farmingTweetId, userId },
      });
      setRetweetResult(retweetRes.data);
      const followRes = await axiosConnect.get('/api/twitter/check-follow', {
        params: { userId, targetUserId: farmingProtocolId },
      });
      setFollowResult(followRes.data);
      const smartRes = await axiosConnect.get('/api/twitter/check-smart-follower', {
        params: { userId, minFollowers },
      });
      setSmartFollowerResult(smartRes.data);
      const combinedRes = await axiosConnect.get('/api/twitter/verify-actions', {
        params: { username, tweetId: farmingTweetId, targetUserId: farmingProtocolId, minFollowers },
      });
      setCombinedResult(combinedRes.data);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Farming Event Check</h2>
        <input
          type="text"
          placeholder="Enter your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="w-full bg-blue-500 mt-4 p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {isChecking ? 'Checking...' : 'Verify Actions'}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {userData && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-2">User Info</h3>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Username:</strong> {userData.username}</p>
          </div>
        )}

        {retweetResult && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Retweet Check</h3>
            <p className={`text-lg font-semibold ${retweetResult.hasRetweeted ? 'text-green-400' : 'text-red-400'}`}>
              {retweetResult.hasRetweeted ? '✅ Retweeted' : '❌ Not Retweeted'}
            </p>
          </div>
        )}

        {followResult && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Follow Check</h3>
            <p className={`text-lg font-semibold ${followResult.isFollowing ? 'text-green-400' : 'text-red-400'}`}>
              {followResult.isFollowing ? '✅ Following FarmingProtocol' : '❌ Not Following FarmingProtocol'}
            </p>
          </div>
        )}

        {smartFollowerResult && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Smart Follower Check</h3>
            <p className={`text-lg font-semibold ${smartFollowerResult.isSmartFollower ? 'text-green-400' : 'text-red-400'}`}>
              {smartFollowerResult.isSmartFollower ? '✅ Smart Follower' : '❌ Not a Smart Follower'}
            </p>
          </div>
        )}

        {combinedResult && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Combined Verification</h3>
            <p className={`text-lg font-semibold ${combinedResult.hasRetweeted ? 'text-green-400' : 'text-red-400'}`}>
              Retweet: {combinedResult.hasRetweeted ? '✅ Passed' : '❌ Failed'}
            </p>
            <p className={`text-lg font-semibold ${combinedResult.isFollowing ? 'text-green-400' : 'text-red-400'}`}>
              Follow: {combinedResult.isFollowing ? '✅ Passed' : '❌ Failed'}
            </p>
            <p className={`text-lg font-semibold ${combinedResult.isSmartFollower ? 'text-green-400' : 'text-red-400'}`}>
              Smart Follower: {combinedResult.isSmartFollower ? '✅ Passed' : '❌ Failed'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
