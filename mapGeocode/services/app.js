const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  let ip;
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.socket && req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  } else {
    ip = req.ip;
  }
  console.log("client IP is *********************" + ip);
  return res.json({ ip });
});

app.get("/address", async (req, res) => {
  const { latitude, longitude } = req.query;
  if (latitude && longitude) {
    // Construct the Geocoding API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      const address = {};
      address.address = response.data.results[0].formatted_address;
      response.data.results[0].address_components.forEach((x) => {
        if (x.types.includes("locality")) {
          address.state = x.long_name;
        } else if (x.types.includes("country")) {
          address.country = x.long_name;
        }
      });
      return res.status(200).json({ address });
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message });
    }
  } else {
    console.error("Geocoding failed.");
    return res.status(400).json({ error: "Geocoding failed." });
  }
});

app.get("/coords", async (req, res) => {
  const { address } = req.query;
  if (address) {
    // Construct the Geocoding API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      return res.status(200).json(Object.values(response.data.results[0].geometry.location));
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message });
    }
  } else {
    console.error("Reverse Geocoding failed.");
    return res.status(400).json({ error: "Reverse Geocoding failed." });
  }
});

const port = process.env.NODE_PORT || 8000;

app.listen(port, () => {
  console.log("Server running..");
});
