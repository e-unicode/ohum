import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function MainPage(props) {
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
        "Authorization": "Bearer " + props.accessToken,
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
    <div className="main">
      {props.moodTag ? (
        <>
          <div className="main-content">
            <div className="main-content-left">
              <div className="main-keyword">
                <div className="main-keyword-box">
                  <h1>오늘 음악 맑음</h1>
                  <p style={{letterSpacing: '8px'}}>음악 취향 공유 플랫폼</p>
                  <h5>
                    지금 어디서, 어떤 날씨에서, 어떤 플레이리스트를 재생하고 있는지 공유해 주세요. 갑자기 뜨거운 태양 아래이고 싶거나, 적당히 어두운
                    구름 아래서 내리는 비를 맞고 싶은 사람이 필요로 할 거예요.
                  </h5>
                  <div>
                    <div className="form">
                      <input className="input" placeholder="이메일" required="" type="email" />
                      <span className="input-border"></span>
                    </div>
                    <div className="form">
                      <input className="input" placeholder="비밀번호" required="" type="password" />
                      <span className="input-border"></span>
                    </div>
                    <div>
                      <Link to="/search">
                        <button className="enter">로그인</button>
                      </Link>
                      <Link to="/join">
                        <button className="enter enter-ml">
                          가입하기
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-content-right">
              <div className="main-card">
                {playlistTag ? (
                  <div
                    onMouseOver={() => {
                      setPlaylistCardTag(true);
                    }}
                    onMouseOut={() => {
                      setPlaylistCardTag(false);
                    }}
                    onClick={() => window.open(`${playlists[randomNum].external_urls.spotify}`, "_blank")}
                    style={{
                      backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${playlists[randomNum].images[0].url})`,
                    }}
                  >
                    {playlistCardTag ? (
                      <p style={{ textAlign: "left" }}>
                        {playlists[randomNum].name}
                        <span>displayed by {playlists[randomNum].owner.display_name}</span>
                      </p>
                    ) : (
                      <p>이 플레이리스트 어때요?</p>
                    )}
                  </div>
                ) : (
                  <Loading />
                )}
                {trackTag ? (
                  <div
                    onMouseOver={() => {
                      setTrackCardTag(true);
                    }}
                    onMouseOut={() => {
                      setTrackCardTag(false);
                    }}
                    onClick={() => window.open(`${tracks[randomNum].external_urls.spotify}`, "_blank")}
                    style={{
                      backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${tracks[randomNum].album.images[0].url})`,
                    }}
                  >
                    {trackCardTag ? (
                      <p style={{ textAlign: "left" }}>
                        {tracks[randomNum].name}
                        <span>song by {tracks[randomNum].artists[0].name}</span>
                      </p>
                    ) : (
                      <p>이 노래 어때요?</p>
                    )}
                  </div>
                ) : (
                  <Loading />
                )}

                {artistTag ? (
                  <div
                    onMouseOver={() => {
                      setArtistCardTag(true);
                    }}
                    onMouseOut={() => {
                      setArtistCardTag(false);
                    }}
                    onClick={() => window.open(`${artists[randomNum].external_urls.spotify}`, "_blank")}
                    style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${artists[randomNum].images[0].url})` }}
                  >
                    {artistCardTag ? (
                      <p style={{ textAlign: "left" }}>
                        {artists[randomNum].name}
                        <span>더보기</span>
                      </p>
                    ) : (
                      <p>이 가수의 음악 어때요?</p>
                    )}
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="main-bottom">
            <Footer mood={props.mood} />
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

export default MainPage;
