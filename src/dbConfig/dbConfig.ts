import mongoose from "mongoose";

export async function connect() {
   try {
      mongoose.connect(process.env.MONGO_URI!);
      const connection = mongoose.connection;

      connection.on("connected", () => {
         console.log("Mongo DB Connected");
      });

      connection.on("error", (error) => {
         console.log("Mongo DB Connection error, please make sure db is up and running");
         console.log(error);
         process.exit();
      });

   } catch (error) {
      console.log("Something wont wrong in connecting to DB");
      console.log(error);
   }
}