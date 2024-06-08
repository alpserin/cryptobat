import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", dataRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
