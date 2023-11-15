import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession(authOption)

  if(!session){
    redirect('/login')
  }
  
  return (
    <>
    {children}
    </>
  )
}
