import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    
  const handleSignIn = () => {
    window.location.href = 'https://farming-social-backend.ue.r.appspot.com/api/twitter/auth';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl text-center font-bold mb-4">Welcome to the Farming Event</h1>
      <div className='grid justify-between'>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 px-6 py-3 mb-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        Sign in with X
      </button>

      <Link
        to={"/telegram"}
        className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        Sign in with Telegram
      </Link>
      </div>
    </div>
  );
}

export default Home;
