"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Profile() {
   const router = useRouter();
   const [data, setData] = useState("");

   const getUserData = async () => {
      try {
         const response = await axios.get("/api/users/profile");
         const user = response.data.data;
         setData(user._id)
         toast.success("Data Get Successfully");
         
      } catch (error: unknown) {
         if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
               status: 500,
            });
         } else {
            return new Response(
               JSON.stringify({ error: "Unknown error occurred." }),
               { status: 500 }
            );
         }
      }
   }

   const logout = async () => {
      try {
         await axios.get("/api/users/logout");
         router.push("/signin");
      } catch (error: unknown) {
         if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
               status: 500,
            });
         } else {
            return new Response(
               JSON.stringify({ error: "Unknown error occurred." }),
               { status: 500 }
            );
         }
      }
   }


   return (
      <div className="flex flex-col items-center justify-center min-h-svh">
         <h1>Profile Page</h1>
         <br />
         <h2>
            {data === "" ? (
               "No Data found"
            ) : (
               <Link href={`/profile/${data}`}>
                  {data}
               </Link>
            )}
         </h2>
         <br />
         <button
            className="mt-10 w-80 h-12 text-2xl cursor-pointer bg-green-500 shadow-lg shadow-green-500/50 rounded-md hover:scale-90 transition-all disabled:opacity-20"
            onClick={getUserData}
         >
            Show User Details
         </button>
         <br />
         <br />

         <button
            className="mt-10 w-80 h-12 text-2xl cursor-pointer bg-red-500 shadow-lg shadow-red-500/50 rounded-md hover:scale-90 transition-all disabled:opacity-20"
            onClick={logout}
         >
            Logout
         </button>
      </div>
   );
}
