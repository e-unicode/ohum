import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import JoinPage from "./Components/JoinPage";
import PostPage from "./Components/PostPage";
import SearchPage from "./Components/SearchPage";
import EnterPage from "./Components/EnterPage";
import MainContent from "./Components/MainContent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MoodData from "./MoodData";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  //spotify 토큰 가져오기
  const [accessToken, setAccessToken] = useState("");
  //현재시간 & 랜덤숫자 가져오기
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const [randomNum2, setRandomNum2] = useState(0);
  //위치&날씨 가져오기
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");
  const [place, setPlace] = useState("");
  const [weatherTag, setWeatherTag] = useState(false);
  const [currentMood, setCurrentMood] = useState("");
  //recommendMusic
  const [moodPlaylists, setMoodPlaylists] = useState([]);
  const [moodPlaylistsTag, setMoodPlaylistsTag] = useState(false);
  const [moodTracks, setMoodTracks] = useState([]);
  const [moodTracksTag, setMoodTracksTag] = useState(false);
  const [moodArtists, setMoodArtists] = useState([]);
  const [moodArtistsTag, setMoodArtistsTag] = useState(false);

  //오늘 Hot 플리
  const [hotPlaylists, setHotPlaylists] = useState([]);
  const [hotPlaylistsTag, setHotPlaylistsTag] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // const [searchInputTag, setSearchInputTag] = useState(false);

  //검색
  const [searchArtist, setSearchArtist] = useState([]);
  const [searchArtistName, setSearchArtistName] = useState("");
  const [searchTopTracks, setSearchTopTracks] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);
  const [searchPlaylists, setSearchPlaylists] = useState([]);
  //선택한음악기반 추천곡 가져오기
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [recommendedTracksTag, setRecommendedTracksTag] = useState(false);
  const [selectedTracksIds, setSelectedTracksIds] = useState(JSON.parse(localStorage.getItem("selectedTracksIds")) || []);
  //mood기반 추천트랙, 아티스트 가져오기
  const [moodRecommendedTracks, setMoodRecommendedTracks] = useState([]);
  const [moodRecommendedTracksTag, setMoodRecommendedTracksTag] = useState(false);

  //spotify 토큰 가져오기
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
  }, []);

  //현재시간 & 랜덤숫자 가져오기
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

      const now = `${month}월 ${date}일 ${day} ${ampm} ${hour}:${minute}`;
      setTimeout(printNow, 1000);
      setNow(now);
      setNowTag(true);
    })();

    (function printRandomNumber() {
      //결과중 몇번째를 가져올지 정하는 랜덤 숫자
      setTimeout(printRandomNumber, 30000);
      const randomNum = Math.floor(Math.random() * 20);
      setRandomNum(randomNum);
    })();

    (function printRandomNumber2() {
      //결과중 몇번째를 가져올지 정하는 랜덤 숫자
      setTimeout(printRandomNumber2, 30000);
      const randomNum2 = Math.floor(Math.random() * 9);
      setRandomNum2(randomNum2);
    })();
  }, []);

  //위치&날씨->mood 가져오기
  useEffect(() => {
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
        })
        .then(() => {
          function getMoodByWeather(weather) {
            let moods;
            switch (weather) {
              case "Clear":
                moods = MoodData.Clear;
                break;
              case "Clouds":
                moods = MoodData.Clouds;
                break;
              case "Rain":
                moods = MoodData.Rain;
                break;
              case "Snow":
                moods = MoodData.Snow;
                break;
              default:
                moods = MoodData.else;
            }
            return moods[Math.floor(Math.random() * moods.length)];
          }
          setCurrentMood(getMoodByWeather(weather));
        })
        .then(() => {
          setWeatherTag(true);
        });
    }
    navigator.geolocation.getCurrentPosition(getWeatherAndMood, () => {
      console.log("Can't find you.");
    });
  }, []);

  async function recommendMusic() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    await fetch("https://api.spotify.com/v1/search?q=" + currentMood + "&type=playlist,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setMoodPlaylists(data.playlists.items);
        setMoodTracks(data.tracks.items);
        setMoodArtists(data.artists.items);
      })
      .then(() => {
        setMoodPlaylistsTag(true);
        setMoodTracksTag(true);
        setMoodArtistsTag(true);
      });

    //오늘 핫 플레이리스트
    await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${place}`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setHotPlaylists(data.playlists.items);
      })
      .then(() => {
        setHotPlaylistsTag(true);
      });

    let moodTrackId = await fetch(`https://api.spotify.com/v1/search?q=${currentMood}&type=track`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        return data.tracks.items[0].id;
      });

    await fetch("https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=" + moodTrackId, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setMoodRecommendedTracks(data);
        console.log(data);
      })
      .then(() => {
        setMoodRecommendedTracksTag(true);
      });
  }

  useEffect(() => {
    if (weatherTag) {
      recommendMusic();
    }
  }, [weatherTag]);

  async function getRecommendations() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    if (selectedTracksIds.length > 0) {
      if (selectedTracksIds.length >= 5) {
        selectedTracksIds.length = 5;
        await fetch("https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=" + selectedTracksIds.join(","), searchParameters)
          .then((response) => response.json())
          .then((data) => {
            setRecommendedTracks(data.tracks);
          });
      } else {
        await fetch("https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=" + selectedTracksIds.join(","), searchParameters)
          .then((response) => response.json())
          .then((data) => {
            setRecommendedTracks(data.tracks);
          });
      }
    }
  }

  async function searchSpotify() {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    //검색시 가장 첫 줄
    //검색한 내용과 가장 관련있는 아티스트 가져오기
    let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        // setSearchParams({ q: searchInput });
        setSearchArtist(data.artists.items);
        setSearchArtistName(data.artists.items[0].name);
        return data.artists.items[0].id;
      });

    //해당 아티스트의 탑트랙10 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?market=KR", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchTopTracks(data.tracks);
      });

    //해당 아티스트의 앨범 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchAlbums(data.items);
      });

    //검색한 내용의 트랙, 플레이리스트 가져오기
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist,track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchTracks(data.tracks.items);
        setSearchPlaylists(data.playlists.items);
      });
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Header now={now} weather={weather} searchSpotify={searchSpotify} setSearchInput={setSearchInput} />

            <Outlet></Outlet>

            <Footer now={now} weather={weather} weatherTag={weatherTag} currentMood={currentMood} />
            <div style={{clear: 'both'}}></div>
          </>
        }
      >
        <Route
          path=""
          element={
            <MainContent
              weatherTag={weatherTag}
              moodPlaylists={moodPlaylists}
              moodPlaylistsTag={moodPlaylistsTag}
              moodTracks={moodTracks}
              moodTracksTag={moodTracksTag}
              moodArtists={moodArtists}
              moodArtistsTag={moodArtistsTag}
              randomNum={randomNum}
              randomNum2={randomNum2}
              hotPlaylistsTag={hotPlaylistsTag}
              hotPlaylists={hotPlaylists}
              currentMood={currentMood}
              moodRecommendedTracks={moodRecommendedTracks}
              moodRecommendedTracksTag={moodRecommendedTracksTag}
            />
          }
        />
        <Route
          path="post"
          element={
            <PostPage
              weather={weather}
              weatherTag={weatherTag}
              place={place}
              getRecommendations={getRecommendations}
              recommendedTracks={recommendedTracks}
            />
          }
        />
        <Route
          path="search"
          element={
            <SearchPage
              searchArtistName={searchArtistName}
              searchTopTracks={searchTopTracks}
              searchTracks={searchTracks}
              searchAlbums={searchAlbums}
              searchPlaylists={searchPlaylists}
            />
          }
        />
        <Route path="enter" element={<EnterPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
