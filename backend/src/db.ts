import mongoos from "mongoose";

export const connectDB = async () => {
  try {
    await mongoos.connect(process.env.MONGO_URI as string);
    console.log("MongoDb Connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
