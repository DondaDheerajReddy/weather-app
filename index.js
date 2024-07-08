import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=52f5ddf8d738e3b5759e03fba809761b&units=metric`
    );
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Error making an API request, ", error);
    res.render("index.ejs", { error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    let city = req.body["city_name"];
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=52f5ddf8d738e3b5759e03fba809761b&units=metric`
    );
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("please enter a city name", error);
    res.render("index.ejs", { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`The server is ready at port ${port}`);
});
