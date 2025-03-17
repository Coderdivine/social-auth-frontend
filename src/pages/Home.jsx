import React from 'react';

function Home() {
    
  const handleSignIn = () => {
    window.location.href = 'http://localhost:5000/api/twitter/auth';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Farming Event</h1>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
      >
        Sign in with X
      </button>
    </div>
  );
}

export default Home;
