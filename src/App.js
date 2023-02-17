import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Loading from "./Loading";
import Keyword from "./Keyword";
import PostPage from "./PostPage";
import SearchPage from "./SearchPage";
import { Routes, Route, Link } from "react-router-dom";
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
              prompt: `The current weather condition is ${weather}, the temperature is ${temperature} degrees and the humidity is ${humidity}. Based on the given weather, temperature, and humidity, suggest a suitable atmosphere as a keyword. Please be careful not to present anything that doesn't suit you.`,
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
        "Authorization": "Bearer " + accessToken,
      },
    };

    let searchInput= "bts"

    var artistID = await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.artists.items[0].id)
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
      })
      .then(() => {
        setArtistTag(true);
      });
    }
  console.log(albums)
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg">
            {moodTag ? (
              <>
                <div className="content-left">
                  <Keyword mood={mood} weather={weather} temperature={temperature} />
                </div>
                <div className="content-right">
                  <div className="main-card">
                    {playlistTag ? (
                      <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${playlists[0].images[0].url})` }}>
                        <p>PLAYLIST: {playlists[randomNum].name}</p>
                        {/* <p>PLAYLIST</p> */}
                      </div>
                    ) : (
                      <Loading />
                    )}
                    {trackTag ? (
                      <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${tracks[0].album.images[0].url})` }}>
                        <p>{tracks[randomNum].name}</p>
                        {/* <p>TRACK</p> */}
                      </div>
                    ) : (
                      <Loading />
                    )}
                    {artistTag ? (
                      <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${artists[0].images[0].url})` }}>
                        <p>{artists[0].name}</p>
                        {/* <p>ARTIST</p> */}
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="keyword-load">
                <Loading />
              </div>
            )}
          </div>
        }
      />
      <Route path="/post" element={<PostPage />} />
      <Route path="/search" element={<SearchPage albums={albums} />} />
    </Routes>
  );
}

export default App;
