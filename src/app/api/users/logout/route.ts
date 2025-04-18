import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
   try {
      const response = NextResponse.json({
         message: "Logout successfully",
         success: true
      }, { status: 200 });

      response.cookies.set("token", "", {
         httpOnly: true,
         expires: new Date(0),
      });

      return response;

   } catch (error: unknown) {
      if (error instanceof Error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
         return NextResponse.json({ error: "Server Error" }, { status: 500 });
      }
   }
}
