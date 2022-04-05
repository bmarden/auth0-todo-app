/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import NavDropdown from './NavDropdown';

const NavBar = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <nav className="flex items-center justify-between py-4">
      <p className="text-2xl font-bold text-gray-800">My Todos</p>
      {!isLoading && !user && (
        <div className="flex">
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
            Login
          </a>
        </div>
      )}
      {user && <NavDropdown userImgSrc={user.picture || ''} />}
    </nav>
  );
};

export default NavBar;
