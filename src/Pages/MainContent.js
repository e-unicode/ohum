import "./MainContent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../Components/Loading";
import { useState, useEffect } from "react";

function MainContent(props) {
  const [playlistsCardTag, setPlaylistsCardTag] = useState(false);
  const [tracksCardTag, setTracksCardTag] = useState(false);
  const [artistsCardTag, setArtistsCardTag] = useState(false);

  // const [moodTrackCardTag, setMoodTrackCardTag] = useState(false);
  return (
    <div className="content">
      {props.weatherTag ? (
        <div>
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
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
                    props.moodPlaylists[props.randomNum].images[0].url
                  })`,
                }}
              >
                {playlistsCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodPlaylists[props.randomNum].name}
                    <span>displayed by {props.moodPlaylists[props.randomNum].owner.display_name}</span>
                  </p>
                ) : (
                  <p>Playlists</p>
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
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
                    props.moodTracks[props.randomNum].album.images[0].url
                  })`,
                }}
              >
                {tracksCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodTracks[props.randomNum].name}
                    <span>song by {props.moodTracks[props.randomNum].artists[0].name}</span>
                  </p>
                ) : (
                  <p>Tracks</p>
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
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
                    props.moodArtists[props.randomNum].images[0].url
                  })`,
                }}
              >
                {artistsCardTag ? (
                  <p style={{ textAlign: "left" }}>
                    {props.moodArtists[props.randomNum].name}
                    <span>더보기</span>
                  </p>
                ) : (
                  <p>Artists</p>
                )}
              </div>
            ) : (
              <Loading />
            )}
          </div>
          <div className="content-introduce">
            <div className="introduce-text">
              <h3>Pick one that fit today's weather and mood.</h3>
            </div>
          </div>
          <div className="content-track">
            {props.hotPlaylistsTag ? (
              <>
                <div className="main-track" style={{ backgroundImage: `url(${props.hotPlaylists[props.randomNum2].images[0].url})` }}></div>
                <div className="main-title">
                  <div
                    className="main-track-title"
                    onClick={() => window.open(`${props.hotPlaylists[props.randomNum2].external_urls.spotify}`, "_blank")}
                  >
                    <h1>{props.hotPlaylists[props.randomNum2].name}</h1>
                  </div>
                </div>
              </>
            ) : (
              <div className="loading-background">
                <Loading />
              </div>
            )}
          </div>
          <div className="content-introduce2">
            <div className="introduce-text2">
              <h4>
                다양한 장르와 분위기의 핫한 플레이리스트를 추천해드립니다. 음악은 우리 삶에서 빼놓을 수 없는 필수품이죠. 함께 즐거운 음악 여행을
                떠나봅시다!
              </h4>
            </div>
          </div>
          <div className="content-container">
            {props.moodRecommendedTracksTag ? (
              <div className="container">
                <h2>#{props.currentMood} #music #for #you</h2>
                <div className="content-result">
                  {props.moodRecommendedTracks.tracks.map((track) => {
                    return (
                      <div id={track.id} className="content-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                        <div className="content-box-card">
                          <div className="content-box-card-cover">
                            <img src={track.album.images[0].url} />
                            <div className="content-box-card-title">
                              <h6>{track.name}</h6>
                              <p>{track.artists[0].name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            ) : null}
          </div>
          <div style={{clear: 'both'}}></div>

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
