import { NextRequest } from "next/server";

export async function getSessionDetails(req: NextRequest) {
    try {
      const cookie = req.headers.get('cookie') || '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-user-auth`, {
        headers: { 'Cookie': cookie },
        credentials: 'include',
      });
      return res.ok ? await res.json() : null;
    } catch (error) {
      return null;
    }
  }