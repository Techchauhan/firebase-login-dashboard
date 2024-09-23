import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-xl text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
