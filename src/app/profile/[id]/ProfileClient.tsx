"use client";

export default function ProfileClient({ id }: { id: string }) {
   return (
      <div className="flex flex-col items-center justify-center min-h-svh">
         <h1>Profile Page</h1>
         <h2 className="p-3 bg-green-500 rounded text-black">{id}</h2>
      </div>
   );
}
