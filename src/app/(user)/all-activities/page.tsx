import { headers } from "next/headers";
import ActivityTableForAdmin from "./activityForAdmin"
import { redirect } from "next/navigation";




const UserActivity =async () => {
    const headerlist = await headers();
    const userRole = headerlist.get('x-user-role');  
    const user_id = headerlist.get('x-user-id');  


  
    if(!user_id) return redirect("/login");
    if(userRole !=="ADMIN") redirect("/")
    return (
        <ActivityTableForAdmin  userId={user_id} />
    )
};

export default UserActivity;
