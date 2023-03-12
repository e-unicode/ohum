import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../Components/Loading";

function AIPage(props) {
  return (
    <div className="post-main flex">
      <div className="post-content">
        {props.AITrackListTag ? (
          <div style={{ overflow: "hidden" }}>
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
              ) : (
                <Loading />
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}

        <div className="container flex AI-Playlist-container">
          <div className="AI-Playlist-box col">
            <div>
              <h4>오늘 HOT 플레이리스트</h4>
              <div>
                {props.hotPlaylistTag ? (
                  <div>
                    <img
                      src={props.hotPlaylist[props.randomNum2].images[0].url}
                      onClick={() => window.open(`${props.hotPlaylist[props.randomNum2].external_urls.spotify}`, "_blank")}
                    />
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="AI-Playlist-box col">
            <div>
              <h4>음악 온도 {props.temperature}℃</h4>
              <div>
                {props.tempMusicListTag ? (
                  <div>
                    <img
                      src={props.tempMusicList[0].images[0].url}
                      onClick={() => window.open(`${props.tempMusicList[0].external_urls.spotify}`, "_blank")}
                    />
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="AI-Playlist-box col">
            <div>
              <h4>오늘 음악 {props.mood}</h4>
              <div>
                {props.moodMusicListTag ? (
                  <div>
                    <img
                      src={props.moodMusicList[0].images[0].url}
                      onClick={() => window.open(`${props.moodMusicList[0].external_urls.spotify}`, "_blank")}
                    />
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPage;
