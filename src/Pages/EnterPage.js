import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function EnterPage(props) {
  const [playlistCardTag, setPlaylistCardTag] = useState(false);
  const [trackCardTag, setTrackCardTag] = useState(false);
  const [artistCardTag, setArtistCardTag] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistTag, setPlaylistTag] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [trackTag, setTrackTag] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistTag, setArtistTag] = useState(false);

  //mood가 바뀔때마다 노래 다시 추천
  useEffect(() => {
    if (props.mood) {
      recommendSpotify();
    }
  }, [props.mood]);

  async function recommendSpotify() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + props.accessToken,
      },
    };

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
        setTracks(data.tracks.items);
        setArtists(data.artists.items);
      })
      .then(() => {
        setPlaylistTag(true);
        setTrackTag(true);
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
                  <div>
                    <h1>오늘 음악 맑음</h1>
                    <p>음악 취향 공유 플랫폼</p>
                    <h5>
                      지금 어디서, 어떤 날씨에서, 어떤 플레이리스트를 재생하고 있는지 공유해 주세요. 갑자기 뜨거운 태양 아래이고 싶거나, 적당히 어두운
                      구름 아래서 내리는 비를 맞고 싶은 사람이 필요로 할 거예요.
                    </h5>
                    <div>
                      <form action="/" method="POST">
                        <div className="form">
                          <input className="input" placeholder="이메일" name="id" type="email" />
                          <span className="input-border"></span>
                        </div>
                        <div className="form">
                          <input className="input" placeholder="비밀번호" name="pw" type="password" />
                          <span className="input-border"></span>
                        </div>
                        <div>
                          <Link to="/">
                            <button className="enter">로그인</button>
                          </Link>
                          <Link to="/join">
                            <button className="enter enter-ml">가입하기</button>
                          </Link>
                        </div>
                      </form>
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
                      onClick={() => window.open(`${playlists[props.randomNum].external_urls.spotify}`, "_blank")}
                      style={{
                        backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${playlists[props.randomNum].images[0].url})`,
                      }}
                    >
                      {playlistCardTag ? (
                        <p style={{ textAlign: "left" }}>
                          {playlists[props.randomNum].name}
                          <span>displayed by {playlists[props.randomNum].owner.display_name}</span>
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
                      onClick={() => window.open(`${tracks[props.randomNum].external_urls.spotify}`, "_blank")}
                      style={{
                        backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${tracks[props.randomNum].album.images[0].url})`,
                      }}
                    >
                      {trackCardTag ? (
                        <p style={{ textAlign: "left" }}>
                          {tracks[props.randomNum].name}
                          <span>song by {tracks[props.randomNum].artists[0].name}</span>
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
                      onClick={() => window.open(`${artists[props.randomNum].external_urls.spotify}`, "_blank")}
                      style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0,0.7) ), url(${artists[props.randomNum].images[0].url})` }}
                    >
                      {artistCardTag ? (
                        <p style={{ textAlign: "left" }}>
                          {artists[props.randomNum].name}
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

export default EnterPage;