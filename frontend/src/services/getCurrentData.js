import axios from "axios";

const getCurrentData = async ()  => {
    try {
      const response = await axios.get('http://localhost:5000/api');
      return response.data.data.data
    } catch (error) {
      console.error(error);
      return error
    }
  }

  export default getCurrentData