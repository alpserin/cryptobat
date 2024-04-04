import express from 'express'
import axios from 'axios'
import getData from './services/fetchData.js'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get('/', async (req,res) => {
    try {
        const data = await getData()
        res.json({data})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'Error fetching data'})
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});