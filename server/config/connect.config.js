import mongoose from "mongoose";
import chalk from "chalk";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(chalk.green('⚡'), chalk.green.bold(`MongoDb connected successfully`));
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : String(error)}`);
  }
};
export default connectToDB;