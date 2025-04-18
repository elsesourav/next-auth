import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyTokenPayload extends JwtPayload {
  id: string;
}

export const getDataFromToken = (request: NextRequest) => {
   try {
      const token = request.cookies.get("token")?.value || ""
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as MyTokenPayload
      return decodedToken.id;

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