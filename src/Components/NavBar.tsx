"use client"
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaRunning } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import Container from './Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Session = {
    role: string
};

async function getSessionDetails() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-user-auth`, {
      method: "GET",
      credentials: "include",
    });
    return res.ok ? await res.json() : null;
  } catch (error) {
    return null;
  }
}

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  // Fetch session details on mount
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionDetails();
      console.log("sessionData ",sessionData?.data?.user)
      setSession(sessionData?.data?.user || null);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      // Send a request to the backend to log out
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',  // Include cookies with the request
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <div className="bg-teal-500 shadow-md">
      <Container>
        <nav className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex cursor-pointer items-center space-x-2 text-white font-bold text-lg">
            <AiFillHome className="text-2xl" />
            <Link href = "/"><span>MyApp</span></Link>
          </div>

          {/* Links Section */}
          <div className="flex items-center space-x-6">
            {/* Conditionally render the "My Activities" link if the user is an admin */}
            {session?.role === "ADMIN" && (
              <Link href="/all-activities" className="flex items-center space-x-1 text-white hover:text-slate-600">
                <FaRunning className="text-lg" />
                <span>All Activities</span>
              </Link>
            )}

            <Link href="/activities" className="flex items-center space-x-1 text-white hover:text-slate-600">
              <FaRunning className="text-lg" />
              <span>My Activities</span>
            </Link>

            <button
              onClick={async () => await handleLogout()}
              className="flex items-center space-x-1 text-white hover:text-slate-600"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
