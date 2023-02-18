import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import MainPage from "./Pages/MainPage";
import PostPage from "./Pages/PostPage";
import SearchPage from "./Pages/SearchPage";
import JoinPage from "./Pages/JoinPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("");
  const [moodTag, setMoodTag] = useState(false);
  const [trackTag, setTrackTag] = useState(false);
  const [artistTag, setArtistTag] = useState(false);
  const [playlistTag, setPlaylistTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);

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

    //결과중 몇번째를 가져올지 정하는 랜덤 숫자
    setRandomNum(Math.floor(Math.random() * 20));

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

  //mood가 바뀔때마다 노래 다시 추천
  useEffect(() => {
    if (mood) {
      searchSpotify();
      console.log(randomNum);
    }
  }, [mood]);

  //노래찾는 함수
  async function searchSpotify() {
    console.log("Search for " + mood);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    let searchInput = "bts";

    var artistID = await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.artists.items[0].id);
        return data.artists.items[0].id;
      });

    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => setAlbums(data.items));

    await fetch("https://api.spotify.com/v1/search?q=" + mood + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
      })
      .then(() => {
        setPlaylistTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + mood + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks.items);
      })
      .then(() => {
        setTrackTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + mood + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists.items);
        console.log(data.artists.items);
      })
      .then(() => {
        setArtistTag(true);
      });
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            moodTag={moodTag}
            playlistTag={playlistTag}
            playlists={playlists}
            trackTag={trackTag}
            tracks={tracks}
            artistTag={artistTag}
            artists={artists}
            randomNum={randomNum}
            mood={mood}
            weather={weather}
            temperature={temperature}
          />
        }
      />
      <Route path="/join" element={<JoinPage mood={mood} />} />
      <Route path="/post" element={<PostPage mood={mood} />} />
      <Route path="/search" element={<SearchPage albums={albums} />} />
    </Routes>
  );
}

export default App;
