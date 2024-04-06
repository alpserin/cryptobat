import axios from "axios";

const getData = async (req, res) => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    return response.data;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cryptocurrency data" });
  }
};

export default getData;
