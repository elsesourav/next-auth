"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type ErrorResponse = {
   message: string;
};

export default function VerifyEmail() {
   const [token, setToken] = useState("");
   const [verified, setVerified] = useState(false);
   const [isToken, setIsToken] = useState(false);
   const [error, setError] = useState(false);

   const verifyUserEmail = async () => {
      try {
         await axios.post("/api/users/verifyemail", { token });
         setVerified(true);
         setError(false);
      } catch (error) {
         const err = error as AxiosError<ErrorResponse>;
         const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong";
         toast.error(message);
         setError(true);
      }
   };

   const searchParams = useSearchParams();

   useEffect(() => {
      setError(false);
      setIsToken(false);
      setToken("");

      const urlToken = searchParams.get("token");
      console.log(urlToken);
      
      if (urlToken && urlToken.length > 0) {
         setToken(urlToken);
         setIsToken(true);
      }
   }, [searchParams]);

   return (
      <div className="flex flex-col justify-center items-center min-h-svh py-2">
         <h1 className="text-4xl">Verify Email</h1>
         <br />
         <h2 className="p-2 bg-orange-400 rounded-md">
            {isToken ? `${token}` : "No Token Found!"}
         </h2>
         <br />
         <button
            className="mt-10 w-80 h-12 text-2xl cursor-pointer bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md hover:scale-90 transition-all disabled:opacity-20"
            onClick={verifyUserEmail}
            disabled={(!isToken || verified)}
         >
            Click to verified
         </button>
         {verified && (
            <>
               <div className="p-5 text-2xl">
                  You Are Verified Now
               </div>
               <Link className="text-xl text-blue-500" href="/signin">
                  Visit To Sign In Page 👉
               </Link>
            </>
         )}
         {error && (
            <div className="m-5 p-5 rounded-lg text-2xl bg-red-600">
               Server Error
            </div>
         )}
      </div>
   );
}
