import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../Components/Loading";
import { useState, useEffect } from "react";

function AIPage(props) {
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
        Authorization: "Bearer " + props.accessToken,
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
    <div className="post-main">
      {props.moodTag ? (
        <div className="post-content">
          <div className="main-card">
            {playlistTag ? (
              <div
                className="main-card-cover"
                onMouseOver={() => {
                  setPlaylistCardTag(true);
                }}
                onMouseOut={() => {
                  setPlaylistCardTag(false);
                }}
                onClick={() => window.open(`${playlists[props.randomNum].external_urls.spotify}`, "_blank")}
                style={{
                  backgroundImage: `url(${playlists[props.randomNum].images[0].url})`,
                }}
              >
                {playlistCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {playlists[props.randomNum].name}
                    <span>displayed by {playlists[props.randomNum].owner.display_name}</span>
                  </p>
                ) : (
                  <p>#{props.mood} Playlist</p>
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
                  backgroundImage: `linear-gradient( rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ), url(${tracks[props.randomNum].album.images[0].url})`,
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
                style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0), rgba(0,0,0,0) ), url(${artists[props.randomNum].images[0].url})` }}
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

          <div className="AI-Track-container">
            {props.AITrackListTag ? (
              <div className="AI-Track-box">
                <div className="main-track" style={{ backgroundImage: `url(${props.AITrackList[props.randomNum].album.images[0].url})` }}></div>
                <div className="main-keyword">
                  <div
                    className="main-track-title"
                    onClick={() => window.open(`${props.AITrackList[props.randomNum].external_urls.spotify}`, "_blank")}
                  >
                    <h1>{props.AITrackList[props.randomNum].name}</h1>
                    <h3>{props.AITrackList[props.randomNum].artists[0].name}</h3>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="container AI-Playlist-container">
            <div className="AI-Playlist-box">
              {props.hotPlaylistTag ? (
                <div>
                  <h4>오늘 HOT 플레이리스트</h4>
                  <img
                    src={props.hotPlaylist[props.randomNum2].images[0].url}
                    onClick={() => window.open(`${props.hotPlaylist[props.randomNum2].external_urls.spotify}`, "_blank")}
                  />
                </div>
              ) : null}
            </div>
            <div className="AI-Playlist-box">
              {props.tempMusicListTag ? (
                <div>
                  <h4>음악 온도 {props.temperature}℃</h4>
                  <img
                    src={props.tempMusicList[0].images[0].url}
                    onClick={() => window.open(`${props.tempMusicList[0].external_urls.spotify}`, "_blank")}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-background">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default AIPage;
