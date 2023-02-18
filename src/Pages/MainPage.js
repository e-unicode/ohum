import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import JoinPage from "./JoinPage";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Location } from "react-router-dom";

function MainPage(props) {
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);
  const [playlistCardTag, setPlaylistCardTag] = useState(false);
  const [trackCardTag, setTrackCardTag] = useState(false);
  const [artistCardTag, setArtistCardTag] = useState(false);

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
    <div className="main-bg">
      {props.moodTag ? (
        <>
          <div className="main-content-left">
            <div className="main-keyword">
              <div className="main-keyword-box">
                <h1>오늘 음악: 맑음</h1>
                <h5>
                  지금 어디서, 어떤 날씨에서, 어떤 플레이리스트를 재생하고 있는지 공유해 주세요. 갑자기 뜨거운 태양 아래이고 싶거나, 적당히 어두운
                  구름 아래서 내리는 비를 맞고 싶은 사람이 필요로 할 거예요.
                </h5>
                {/* {nowTag === true ? <p>{now}</p> : null} */}
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
                    <Link to="/post">
                      <button className="enter">로그인</button>
                    </Link>
                    <Link to="/join">
                      <button className="enter" style={{ marginLeft: "10px" }}>
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
              {props.playlistTag ? (
                <div
                  onMouseOver={() => {
                    setPlaylistCardTag(true);
                  }}
                  onMouseOut={() => {
                    setPlaylistCardTag(false);
                  }}
                  onClick={() => window.open(`${props.playlists[0].external_urls.spotify}`, "_blank")}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.playlists[0].images[0].url})`,
                  }}
                >
                  {playlistCardTag ? (
                    <p style={{ textAlign: "left" }}>
                      {props.playlists[0].name}
                      <span style={{ fontSize: "17px", display: "block" }}>displayed by {props.playlists[0].owner.display_name}</span>
                    </p>
                  ) : (
                    <p>이 플레이리스트 어때요?</p>
                  )}
                </div>
              ) : (
                <Loading />
              )}
              {props.trackTag ? (
                <div
                  onMouseOver={() => {
                    setTrackCardTag(true);
                  }}
                  onMouseOut={() => {
                    setTrackCardTag(false);
                  }}
                  onClick={() => window.open(`${props.tracks[0].external_urls.spotify}`, "_blank")}
                  style={{
                    backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.tracks[0].album.images[0].url})`,
                  }}
                >
                  {trackCardTag ? (
                    <p style={{ textAlign: "left" }}>
                      {props.tracks[0].name}
                      <span style={{ fontSize: "17px", display: "block" }}>song by {props.tracks[0].artists[0].name}</span>
                    </p>
                  ) : (
                    <p>이 노래 어때요?</p>
                  )}
                </div>
              ) : (
                <Loading />
              )}

              {props.artistTag ? (
                <div
                  onMouseOver={() => {
                    setArtistCardTag(true);
                  }}
                  onMouseOut={() => {
                    setArtistCardTag(false);
                  }}
                  onClick={() => window.open(`${props.artists[0].external_urls.spotify}`, "_blank")}
                  style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.artists[0].images[0].url})` }}
                >
                  {artistCardTag ? (
                    <p style={{ textAlign: "left" }}>
                      {props.artists[0].name}
                      <span style={{ fontSize: "17px", display: "block" }}>더보기</span>
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
          <div className="main-footer">
            <div className="main-footer-content">
              <p>지금 음악: {props.mood}</p>
              <p>가입하기</p>
              <p>로그인</p>
              <p>한국어</p>
              <p>English(US)</p>
              <p>e-unicode @ 2023</p>
              {/* <p>{nowTag === true ? <p>{now}</p> : null}</p> */}
            </div>
          </div>
        </>
      ) : (
        <div className="keyword-load">
          <Loading />
        </div>
      )}
      {/* {joinModal === true ? <Join /> : null} */}
    </div>
  );
}

export default MainPage;
