import React from 'react';
import Charts from './Charts';

const App = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold">GPU Performance Monitor</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <Charts />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-2 text-center">
        © 2024 GPU Monitor by Louis Paulet
      </footer>
    </div>
  );
};

export default App;
