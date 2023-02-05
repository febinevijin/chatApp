import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import fileUpload from "express-fileupload";

dotenv.config({ path: path.resolve(__dirname, "./.env") });
import cors from "cors";
import { createSocket } from "./utils/socketio.js";



connectDB();
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {});

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

 const server = app.listen(PORT, 
    console.log(`server started on port ${PORT}`)
);


createSocket(server)


