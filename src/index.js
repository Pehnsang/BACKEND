import dotenv from "dotenv";
import connectDB from "./config/database.js"
import app from "./app.js";

dotenv.config({
    path: '.env'
});

console.log("MONGODB_URI:", process.env.MONGODB_URI)

const startServer = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI)
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;

        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port: ${process.env.PORT || 8000}`)
        })
    } catch (error) {
        console.log("MongoDB connection failed", error);

    }
}

startServer();
