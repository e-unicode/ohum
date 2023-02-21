import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import MainPage from "./Pages/MainPage";
import PostPage from "./Pages/PostPage";
import SearchPage from "./Pages/SearchPage";
import JoinPage from "./Pages/JoinPage";
import Banner from "./Components/Banner";
import Search from "./Components/Search";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [artistPlaylists, setArtistPlaylists] = useState([]);
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
  const [searchInput, setSearchInput] = useState("");

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

    let artistID = await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });

    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?market=KR", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.tracks);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + artistID + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtistPlaylists(data.playlists.items);
      });

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
        // console.log(data.artists.items);
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
      <Route
        path="/search"
        element={
          <div className="post">
            <div className="post-top">
              <div className="search-form">
                <div className="form" style={{ width: "100%" }}>
                  <input
                    className="search-input"
                    type="input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        searchSpotify();
                      }
                    }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="노래 제목, 가수 이름, 관련 키워드를 입력하세요."
                    required=""
                  />
                  <button onClick={searchSpotify} className="search-enter">
                    찾기
                  </button>
                </div>
              </div>
            </div>

            <div className="post-content">
              <div className="post-content-side">
                <Banner />
              </div>

              <div className="post-content-main row">
                <div className="search-result col">
                  <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>TopTracks</h2>
                  <div className="post-content-result">
                    {topTracks.map((topTrack, i) => {
                      return (
                        <div className="result-box" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
                          <div className="result-box-card">
                            <div className="result-box-card-cover">
                              <img src={topTrack.album.images[0].url} />
                            </div>
                            <div className="result-box-card-title">
                              <p style={{ fontWeight: "700" }}>{topTrack.name}</p>
                              <p style={{ fontSize: "15px" }}>{topTrack.artists[0].name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="search-result col">
                  <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>Albums</h2>
                  <div className="post-content-result">
                    {albums.map((album, i) => {
                      return (
                        <div className="result-box" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
                          <div className="result-box-card">
                            <div className="result-box-card-cover">
                              <img src={album.images[0].url} />
                            </div>
                            <div className="result-box-card-title">
                              <p style={{ fontWeight: "700" }}>{album.name}</p>
                              <p style={{ fontSize: "15px" }}>{album.artists[0].name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="search-result col">
                  <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>Playlists</h2>
                  <div className="post-content-result">
                    {artistPlaylists.map((artistPlaylist, i) => {
                      return (
                        <div className="result-box" onClick={() => window.open(`${artistPlaylist.external_urls.spotify}`, "_blank")}>
                          <div className="result-box-card">
                            <div className="result-box-card-cover">
                              <img src={artistPlaylist.images[0].url} />
                            </div>
                            <div className="result-box-card-title">
                              <p style={{ fontWeight: "700" }}>{artistPlaylist.name}</p>
                              <p style={{ fontSize: "15px" }}>{artistPlaylist.owner.display_name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
