import { headers } from "next/headers";
import ActivityTable from "./activityTable"
import { redirect } from "next/navigation";


const getActivities =async (user_id:string | null) =>{
    try {
       const headers:any={}
        if(user_id){
          headers["x-user-id"] = user_id
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/get-logs`,
                    {
                method: "GET",
                headers,
                credentials: "include", // Include credentials (cookies) with the request
            }
        ); 
        if (!response.ok) {
            throw new Error("Failed to fetch logs");
        }
        const {data} = await response.json();
        return data.logs;
    } catch (err: any) {
        console.log("Error while fetching user's activity ", err);
        return null;
    }
}


const UserActivity =async () => {
    const headerlist = await headers(); 
    const user_id = headerlist.get('x-user-id');  


  
    if(!user_id) return redirect("/login")

    const activities =await getActivities(user_id)
    if(!activities) {
        return (
            <h1>We are Facing technical issue right now! please try again lather.</h1>
        )
    }
    if(!activities.length){
        return (
            <h1>No Activity To Show</h1>
        )
    }
    return (
        <ActivityTable activities={activities} />
    )
};

export default UserActivity;
