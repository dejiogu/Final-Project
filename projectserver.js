const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});