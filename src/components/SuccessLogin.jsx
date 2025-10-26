import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessLogin = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Login Successful!</h1>
        <p className="text-green-600">You have been logged in with Google.</p>
        {accessToken && (
          <p className="text-sm text-gray-600 mt-2">Access token stored in localStorage.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessLogin;
