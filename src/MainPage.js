import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Login from "./Login";

function MainPage(props) {
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);

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
                <Login />
                </div>
            </div>
          </div>
          <div className="main-content-right">
            <div className="main-card">
              {props.playlistTag ? (
                <div
                  style={{
                    backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.playlists[props.randomNum].images[0].url})`,
                  }}
                >
                  <p>{props.playlists[props.randomNum].name}</p>
                  {/* <p>PLAYLIST</p> */}
                </div>
              ) : (
                <Loading />
              )}
              {props.trackTag ? (
                <div
                  style={{
                    backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.tracks[props.randomNum].album.images[0].url})`,
                  }}
                >
                  <p>{props.tracks[props.randomNum].name}</p>
                  {/* <p>TRACK</p> */}
                </div>
              ) : (
                <Loading />
              )}
              {props.artistTag ? (
                <div style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${props.artists[0].images[0].url})` }}>
                  <p>{props.artists[0].name}</p>
                  {/* <p>ARTIST</p> */}
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
    </div>
  );
}

export default MainPage;
