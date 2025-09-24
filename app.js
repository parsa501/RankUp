import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import userRouter from "./Routes/User.js";
import { catchError,HandleERROR } from "vanta-api";
import authRouter from "./Routes/Auth.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./Utils/Swagger.js";
import exportValidation from "./Middleware/ExportValidation.js";
import gameRouter from "./Routes/Game.js";
import scoreRouter from "./Routes/Score.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("Public"));
app.use("/api/auth", authRouter);
app.use(exportValidation);


app.use("/api/users", userRouter);
app.use("/api/game", gameRouter);
app.use("/api/Score", scoreRouter);

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.use((req, res, next) => {
  return next(new HandleERROR('Not Found', 404));
});
app.use(catchError)
export default app