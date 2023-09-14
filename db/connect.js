import mongoose from "mongoose"

const connectDB = (url) => {
	mongoose
		.connect(url)
		.then(console.log("CONNECTED TO DB..."))
		.catch((err) => console.log(err))
}

export default connectDB
