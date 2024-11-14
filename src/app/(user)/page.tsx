import TodoPage from "@/Components/Todo";
import { headers } from "next/headers";

export default async function Home() {
  const headerlist = await headers();

  const userName = headerlist.get('x-user-name'); 
  const userRole = headerlist.get('x-user-role');  


  return (
    <>
    {userRole ==="ADMIN" ? (
      <h1>Welcome <span className="text-2xl italic">{userName || 'Admin'} (Admin),</span></h1>
    ) : (
      <h1>Welcome <span className="text-2xl italic">{userName || 'User'},</span></h1>
    )}
      <p className="font-mono text-slate-600 px-2 mt-2">Manage Your  Daily Track Of Todo's , Plan Your Work and You Can Alo Check your Whole Activity With Us!</p>
      <TodoPage />
    </>
  );
}
