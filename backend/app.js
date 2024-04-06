import express from "express";
import axios from "axios";
import cors from "cors";
import getData from "./services/getData.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/currentdata", async (req, res) => {
  try {
    var data = await getData();
    return res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
