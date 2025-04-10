import React from 'react';

function TailwindTest() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm font-semibold text-purple-600">TAILWIND TEST</div>
          <p className="mt-2 text-gray-600">
            If you can see this card with proper styling, Tailwind CSS is working correctly!
          </p>
          
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div>
              <div className="w-16 h-16 bg-red-500 rounded-md"></div>
              <p className="mt-2 text-xs text-center">Red</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-md"></div>
              <p className="mt-2 text-xs text-center">Blue</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-500 rounded-md"></div>
              <p className="mt-2 text-xs text-center">Green</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-yellow-500 rounded-md"></div>
              <p className="mt-2 text-xs text-center">Yellow</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Blue Button
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Green Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest; 