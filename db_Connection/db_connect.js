import mongoose from "mongoose";

const connect = async () => {
  try {
    const Connection = await mongoose.connect(process.env.MONGO)
    console.log("connected to Mongoose")
  } catch (error) {
    console.log({
      message: "Couldn't connect to Mongo",
      error: error.message
    })
  }
}

export default connect