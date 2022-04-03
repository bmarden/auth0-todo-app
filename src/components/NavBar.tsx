import React from 'react';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <p className="text-2xl font-bold text-gray-800">My Todos</p>
      <div className="flex">
        <a
          href="/api/logout"
          className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
          Logout
        </a>
        <a href="/api/login" className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
          Login
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
