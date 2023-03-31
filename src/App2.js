import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Loading from "./Loading";
import Keyword from "./Keyword";
import styled from "styled-components";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [accessToken, setAccessToken] = useState("");
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

  // //ai키워드 가져오기

  // useEffect(() => {
  //   const configuration = new Configuration({
  //     apiKey: openai_api_key,
  //   });
  //   const openai = new OpenAIApi(configuration);

  //   //ai로 날씨와 어울리는 mood 키워드 가져오기

  //   if (weatherTag) {
  //     openai
  //       .createCompletion({
  //         model: "text-davinci-003",
  //         prompt: `Please present your answer as a keyword.
  //               Current weather conditions: ${weather}
  //               Temperature: ${temperature} degrees.
  //               Emotional conditions: Answer.`,
  //         // prompt: `The current weather condition is ${weather} and the temperature is ${temperature} degrees. Please suggest the atmosphere or mood that matches the given weather conditions and temperatures as one keyword. Please be careful not to present keywords that are not appropriate.`,
  //         temperature: 1,
  //         max_tokens: 256,
  //         top_p: 1,
  //         frequency_penalty: 0,
  //         presence_penalty: 0,
  //         max_rps: 0.5,
  //       })
  //       .then((result) => {
  //         setMood(result.data.choices[0].text);
  //         console.log(result.data.choices[0].text);
  //       })
  //       .then(() => {
  //         setMoodTag(true);
  //         console.log("무드", moodTag);
  //       });
  //   }

  //   //ai로 메인 추천 트랙 불러오기
  //   openai
  //     .createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `오늘과 잘 어울리는 가수를 추천해주세요. 검색어에 사용할 수 있도록 간결하게 답변해주세요.`,
  //       // prompt: `Please recommend a song that goes well with today. Please answer in the form of singer and title so that you can use it for search terms.`,
  //       temperature: 1,
  //       max_tokens: 256,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //       max_rps: 0.5,
  //     })
  //     .then((result) => {
  //       setAITrack(result.data.choices[0].text);
  //       console.log(result.data.choices[0].text);
  //     })
  //     .then(() => {
  //       setAITrackTag(true);
  //       console.log("트랙", AITrackTag);
  //     });
  // }, [weatherTag]);

  //현재 날씨에 따른 mood가져오기
  // function getMoodByWeather(weather) {
  //   let moods;
  //   switch (weather) {
  //     case "Clear":
  //       moods = MoodData.Clear;
  //       break;
  //     case "Clouds":
  //       moods = MoodData.Clouds;
  //       break;
  //     case "Rain":
  //       moods = MoodData.Rain;
  //       break;
  //     case "Snow":
  //       moods = MoodData.Snow;
  //       break;
  //     default:
  //       moods = MoodData.else;
  //   }
  //   return moods[Math.floor(Math.random() * moods.length)];
  // }
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

    //위치&날씨 가져오기
    function getWeatherAndMood(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`;
      fetch(weatherUrl)
        .then((response) => response.json())
        .then((result) => {
          const 온도 = Math.round(Number(result.main.temp) - 273.15);
          const 습도 = result.main.humidity;
          const 날씨 = result.weather[0].description;
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
              prompt: `The current temperature is ${temperature} degrees. Please suggest one mood keyword that matches the current weather.`,
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

    navigator.geolocation.getCurrentPosition(getWeatherAndMood, () => {
      console.log("Can't find you.");
    });
  }, []);

  useEffect(() => {
    if (mood) {
      searchSpotify();
      console.log(randomNum);
    }
  }, [mood]);

  async function searchSpotify() {
    console.log("Search for " + mood);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

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

  return (
    <div className="bg">
      {moodTag ? (
        <>
          <div className="content-left">
            <Keyword mood={mood} weather={weather} temperature={temperature} />
          </div>
          <div className="content-right">
            <div className="card">
              {playlistTag ? (
                <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${playlists[0].images[0].url})` }}>
                  {/* <p>PLAYLIST: {playlists[randomNum].name}</p> */}
                  <p>PLAYLIST</p>
                </div>
              ) : (
                <Loading />
              )}
              {trackTag ? (
                <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${tracks[0].album.images[0].url})` }}>
                  {/* <span>{tracks[randomNum].name}</span> */}
                  <p>TRACK</p>
                </div>
              ) : (
                <Loading />
              )}
              {artistTag ? (
                <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${artists[0].images[0].url})` }}>
                  {/* <span>{artists[0].name}</span> */}
                  <p>ARTIST</p>
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
  );
}

export default App;
