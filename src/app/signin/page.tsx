"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ErrorResponse = {
   message: string;
};

export default function SignIn() {
   const router = useRouter();
   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);

   const onSignin = async () => {
      try {
         setLoading(true);
         setButtonDisabled(true);
         const response = await axios.post("/api/users/signin", user);
         console.log("Signin success", response.data);
         router.push("/profile");
      } catch (error) {
         const err = error as AxiosError<ErrorResponse>;
         const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong";
         toast.error(message);
      }
   };

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      if (
         user.email.length > 0 &&
         user.password.length > 0
      ) {
         setButtonDisabled(false);
      }
   }, [user]);

   return (
      <div className="flex flex-col items-center justify-center min-h-svh">
         <h1 className="text-3xl font-bold mb-10">
            {loading ? "Processing..." : "Sign In"}
         </h1>
         <label className="p-2 w-80 text-xl" htmlFor="email">
            Email
         </label>
         <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="outline-none relative w-80 text-xl pt-2 pb-2 pl-4 pr-4 rounded-lg bg-gray-200 text-black mb-6 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
            value={user.email}
            onChange={onChangeHandler}
         />
         <label className="p-2 w-80 text-xl" htmlFor="password">
            Password
         </label>
         <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="outline-none w-80 text-xl pt-2 pb-2 pl-4 pr-4 rounded-lg bg-gray-200 text-black mb-6"
            value={user.password}
            onChange={onChangeHandler}
         />
         <button
            className="mt-10 w-80 h-12 text-2xl cursor-pointer bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md hover:scale-90 transition-all disabled:opacity-20"
            onClick={onSignin}
            disabled={buttonDisabled}
         >
            {buttonDisabled ? "Submit" : "Fill The Form"}
         </button>

         <Link className="mt-10 text-xl text-blue-500" href="/signup">
            Visit Sign Up page 👉
         </Link>
      </div>
   );
}
