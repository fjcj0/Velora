import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect to Db success");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
