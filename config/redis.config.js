import { createClient } from "redis";
import chalk from "chalk";
export const client = createClient({
  url: "redis://localhost:6379", 
});
client.on("error", (err) => console.error(chalk.bgRed.white("Redis Error:"), err));
export const connectToRedis = async () => {
  if (client.isOpen) return;
  await client.connect();
  console.log(chalk.red("\n➤ Redis connected"));
};