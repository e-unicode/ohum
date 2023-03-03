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
  const [place, setPlace] = useState("");
  const [mood, setMood] = useState("");
  const [moodTag, setMoodTag] = useState(false);
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);
  const [ai아티스트, setAi아티스트] = useState("");
  const [추천음악2, set추천음악2] = useState("");

  //spotify 토큰, 날씨, ai키워드 가져오기
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
          const 위치 = result.sys.country;
          setTemperature(온도);
          setHumidity(습도);
          setWeather(날씨);
          setPlace(위치);

          const configuration = new Configuration({
            apiKey: openai_api_key,
          });
          const openai = new OpenAIApi(configuration);

          //ai로 날씨와 어울리는 mood 키워드 가져오기
          openai
            .createCompletion({
              model: "text-davinci-003",
              prompt: `The current weather condition is ${weather} and the temperature is ${temperature} degrees. Please suggest the atmosphere or mood that matches the given weather conditions and temperatures as one keyword. Please be careful not to present keywords that are not appropriate.`,
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

          //ai로 추천 아티스트 불러오기
          openai
            .createCompletion({
              model: "text-davinci-003",
              prompt: `${now}, please recommend the best singer for this time.`,
              temperature: 0.7,
              max_tokens: 256,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            })
            .then((result) => {
              setAi아티스트(result.data.choices[0].text);
            });

          //ai로 추천음악 키워드2 불러오기
          openai
            .createCompletion({
              model: "text-davinci-003",
              prompt: `The current time is ${now}. Please recommend a movie that goes well with now. The answer is the title of the movie. Just answer the title.`,
              temperature: 0.7,
              max_tokens: 256,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            })
            .then((result) => {
              set추천음악2(result.data.choices[0].text);
            });
        });
    }
    //위치&날씨 가져오기
    navigator.geolocation.getCurrentPosition(getWeatherAndMood, () => {
      console.log("Can't find you.");
    });
  }, []);

  //현재시간 가져오기
  useEffect(() => {
    (function printNow() {
      const today = new Date();

      const dayNames = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];

      const day = dayNames[today.getDay()];

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      let hour = today.getHours();
      let minute = today.getMinutes();
      let second = today.getSeconds();
      const ampm = hour >= 12 ? "오후" : "오전";

      hour %= 12;
      hour = hour || 12;

      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;

      const now = `${month}. ${date}.${day} ${ampm} ${hour}:${minute}`;
      setTimeout(printNow, 1000);
      setNow(now);
      setNowTag(true);
    })();
  }, [now]);

  return (
    <Routes>
      <Route path="/" element={<MainPage mood={mood} moodTag={moodTag} accessToken={accessToken} />} />
      <Route path="/join" element={<JoinPage mood={mood} />} />
      <Route path="/post" element={<PostPage mood={mood} moodTag={moodTag} weather={weather} accessToken={accessToken} now={now} />} />
      <Route
        path="/search"
        element={
          <SearchPage
            mood={mood}
            moodTag={moodTag}
            weather={weather}
            accessToken={accessToken}
            now={now}
            place={place}
            ai아티스트={ai아티스트}
            추천음악2={추천음악2}
            openai_api_key={openai_api_key}
          />
        }
      />
    </Routes>
  );
}

export default App;
