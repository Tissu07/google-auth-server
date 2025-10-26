import React from "react";

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
