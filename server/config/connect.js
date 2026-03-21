import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect to Db success");
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : String(error)}`);
  }
};
export default connectToDB;