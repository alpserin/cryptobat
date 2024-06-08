import getData from "../services/getData.js";

export const getCurrentData = async (req,res) => {
    try {
        var data = await getData();
        return res.json({ data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching data" });
      }
}
