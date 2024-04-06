import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    const connected = await connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected: ",
      connected.connection.host,
      connected.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};