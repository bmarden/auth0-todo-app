/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

const NavBar = () => {
  const { user, isLoading } = useUser();
  return (
    <nav className="flex items-center justify-between py-4">
      <p className="text-2xl font-bold text-gray-800">My Todos</p>
      {!isLoading && !user && (
        <div className="flex">
          <a
            href="/api/auth/logout"
            className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
            Logout
          </a>
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
            Login
          </a>
        </div>
      )}
      {user && (
        <Image
          src={user.picture || ''}
          alt="profile"
          width="50"
          height="50"
          decoding="async"
          className=" nav-user-profile mr-2 inline w-10 rounded-full object-cover"
          layout="fixed"></Image>
      )}
    </nav>
  );
};

export default NavBar;
