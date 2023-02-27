import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import JoinPage from "./Pages/JoinPage";
import PostPage from "./Pages/PostPage";
import SearchPage from "./Pages/SearchPage";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("");
  const [moodTag, setMoodTag] = useState(false);

  useEffect(() => {
    //API access token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));

    //위치&날씨 가져온 후 ai로 mood가져오기
    function getWeatherAndMood(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`;
      fetch(weatherUrl)
        .then((response) => response.json())
        .then((result) => {
          const 온도 = Math.round(Number(result.main.temp) - 273.15);
          const 습도 = result.main.humidity;
          const 날씨 = result.weather[0].main;
          setTemperature(온도);
          setHumidity(습도);
          setWeather(날씨);
          console.log(온도 + "ºC", 습도 + "%", 날씨);

          const configuration = new Configuration({
            apiKey: openai_api_key,
          });
          const openai = new OpenAIApi(configuration);

          //ai로 날씨와 어울리는 키워드 가져오기->mood
          openai
            .createCompletion({
              model: "text-davinci-003",
              prompt: `Current weather conditions are ${weather}, temperature is ${temperature}, humidity is ${humidity}. Based on the given weather, temperature, and humidity, please present the appropriate atmosphere in one Korean keyword. Be careful not to suggest anything out of step with the weather.`,
              temperature: 0.7,
              max_tokens: 256,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            })
            .then((result) => {
              setMood(result.data.choices[0].text);
            })
            .then(() => {
              setMoodTag(true);
            });
        });
    }
    //위치&날씨 가져오기
    navigator.geolocation.getCurrentPosition(getWeatherAndMood, () => {
      console.log("Can't find you.");
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage mood={mood} moodTag={moodTag} accessToken={accessToken} />} />
      <Route path="/join" element={<JoinPage mood={mood} />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/search" element={<SearchPage mood={mood} moodTag={moodTag} accessToken={accessToken} />} />
    </Routes>
  );
}

export default App;
