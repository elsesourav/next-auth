import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
   try {
      // extract data from token
      const userId = getDataFromToken(request);
      const user = await User.findOne({ _id: userId }).select("-password");

      if (!user) {
         return NextResponse.json(
            { error: "User token not found" },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { message: "User found", success: true, data: user },
         { status: 200 }
      );
      
   } catch (error: unknown) {
      if (error instanceof Error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
         return NextResponse.json({ error: "Server Error" }, { status: 500 });
      }
   }
}
