import "./MainContent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../Components/Loading";
import { useState, useEffect } from "react";
import MoodData from "../MoodData";

function MainContent(props) {
  const [playlistsCardTag, setPlaylistsCardTag] = useState(false);
  const [tracksCardTag, setTracksCardTag] = useState(false);
  const [artistsCardTag, setArtistsCardTag] = useState(false);

  return (
    <div className="content">
      {props.weatherTag ? (
        <div>
          {/* <div className="content-track">
            {AITrackListTag ? (
              <>
                <div className="main-track" style={{ backgroundImage: `url(${AITrackList[props.randomNum].album.images[0].url})` }}></div>
                <div className="main-title">
                  <div className="main-track-title" onClick={() => window.open(`${AITrackList[props.randomNum].external_urls.spotify}`, "_blank")}>
                    <h1>{AITrackList[props.randomNum].name}</h1>
                    <h3>{AITrackList[props.randomNum].artists[0].name}</h3>
                  </div>
                </div>
              </>
            ) : (
              <div className="loading-background">
                <Loading />
              </div>
            )}
          </div> */}

          <div className="content-introduce">
            <div className="introduce">
              <h3>Pick one!</h3>
              {/* <p>I recommend singers, music, and playlists that fit today's weather and mood.</p> */}
            </div>
          </div>

          <div className="content-mood">
            {props.moodPlaylistsTag ? (
              <div
                onMouseOver={() => {
                  setPlaylistsCardTag(true);
                }}
                onMouseOut={() => {
                  setPlaylistsCardTag(false);
                }}
                onClick={() => window.open(`${props.moodPlaylists[props.randomNum].external_urls.spotify}`, "_blank")}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.moodPlaylists[props.randomNum].images[0].url})`,
                }}
              >
                {playlistsCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodPlaylists[props.randomNum].name}
                    <span>displayed by {props.moodPlaylists[props.randomNum].owner.display_name}</span>
                  </p>
                ) : (
                  <p>이 플레이리스트 어때요?</p>
                )}
              </div>
            ) : (
              <Loading />
            )}
            {props.moodTracksTag ? (
              <div
                onMouseOver={() => {
                  setTracksCardTag(true);
                }}
                onMouseOut={() => {
                  setTracksCardTag(false);
                }}
                onClick={() => window.open(`${props.moodTracks[props.randomNum].external_urls.spotify}`, "_blank")}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.moodTracks[props.randomNum].album.images[0].url})`,
                }}
              >
                {tracksCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodTracks[props.randomNum].name}
                    <span>song by {props.moodTracks[props.randomNum].artists[0].name}</span>
                  </p>
                ) : (
                  <p>이 노래 어때요?</p>
                )}
              </div>
            ) : (
              <Loading />
            )}

            {props.moodArtistsTag ? (
              <div
                onMouseOver={() => {
                  setArtistsCardTag(true);
                }}
                onMouseOut={() => {
                  setArtistsCardTag(false);
                }}
                onClick={() => window.open(`${props.moodArtists[props.randomNum].external_urls.spotify}`, "_blank")}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.moodArtists[props.randomNum].images[0].url})`,
                }}
              >
                {artistsCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodArtists[props.randomNum].name}
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

          {/* <div className="container AI-Playlist-container">
            <div className="AI-Playlist-box">
              {hotPlaylistTag ? (
                <div>
                  <h4>오늘 HOT 플레이리스트</h4>
                  <img
                    src={hotPlaylist[props.randomNum2].images[0].url}
                    onClick={() => window.open(`${hotPlaylist[props.randomNum2].external_urls.spotify}`, "_blank")}
                  />
                </div>
              ) : null}
            </div>
          </div> */}
        </div>
      ) : (
        <div className="loading-background">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default MainContent;
