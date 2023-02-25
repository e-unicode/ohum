import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

function RecommendPage(props) {
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);
  const [playlistCardTag, setPlaylistCardTag] = useState(false);
  const [trackCardTag, setTrackCardTag] = useState(false);
  const [artistCardTag, setArtistCardTag] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistTag, setPlaylistTag] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [trackTag, setTrackTag] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistTag, setArtistTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);

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

  useEffect(() => {
    //결과중 몇번째를 가져올지 정하는 랜덤 숫자
    setRandomNum(Math.floor(Math.random() * 20));
  }, []);

  //mood가 바뀔때마다 노래 다시 추천
  useEffect(() => {
    if (props.mood) {
      recommendSpotify();
    }
  }, [props.mood]);

  async function recommendSpotify() {
    console.log("Search for " + props.mood);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
      })
      .then(() => {
        setPlaylistTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks.items);
        console.log(data.tracks.items);
      })
      .then(() => {
        setTrackTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists.items);
      })
      .then(() => {
        setArtistTag(true);
      });
  }

  return (
    <>
      <div className="post-top"></div>
      <div className="post-content">
        <div className="post-content-side">
          <Banner />
        </div>

        <div className="post-content-main">
          <div className="search-result row">
            {tracks.map((track, i) => {
              return trackTag ? (
                <div className="result-box col">
                  <div className="result-box" onClick={() => window.open(`${tracks[i].external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={tracks[i].album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{tracks[i].name}</p>
                        <p style={{ fontSize: "15px" }}>{tracks[i].artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              );
            })}

            <div className="result-box col"></div>
            <div className="result-box col"></div>
            <div className="result-box col"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendPage;
