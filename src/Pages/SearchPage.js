import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function SearchPage(props) {
  const [index, setIndex] = useState(["Top10", "Tracks", "Albums", "Playlists"]);
  const [count, setCount] = useState([1, 1, 1, 1]);
  const [showTag, setShowTag] = useState([true, true, true, true]);

  return (
    <div className="container">
      <div className="index flex w-100">
        {index.map(function (indexName, i) {
          return (
            <p
              onClick={(e) => {
                let copy = [...showTag];
                copy[i] = !copy[i];
                setShowTag(copy);
                e.stopPropagation();
                let copy2 = [...count];
                copy2[i] = copy2[i] + 1;
                setCount(copy2);
              }}
              className={count[i] % 2 !== 0 ? "check index-content in-bl" : "index-content in-bl"}
            >
              {indexName}
            </p>
          );
        })}
      </div>
      {showTag[0] ? (
        <>
          <h2>{props.searchArtistName}의 TopTracks</h2>
          <div className="search-result">
            {props.searchTopTracks.map((topTrack, i) => {
              return (
                <div id={[i]} className="result-box in-bl" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
                  <div className="result-box-card">
                    <div className="result-box-card-cover">
                      <img src={topTrack.album.images[0].url} />
                    </div>
                    <div className="result-box-card-title">
                      <h6>{topTrack.name}</h6>
                      <p>{topTrack.artists[0].name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {showTag[1] ? (
        <>
          <h2>Tracks</h2>
          <div className="search-result">
            {props.searchTracks.map((track, i) => {
              return (
                <div className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                  <div className="result-box-card">
                    <div className="result-box-card-cover">
                      <img src={track.album.images[0].url} />
                    </div>
                    <div className="result-box-card-title">
                      <h6>{track.name}</h6>
                      <p>{track.artists[0].name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {showTag[2] ? (
        <>
          <h2>Albums</h2>
          <div className="search-result">
            {props.searchAlbums.map((album, i) => {
              return (
                <div className="result-box in-bl" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
                  <div className="result-box-card">
                    <div className="result-box-card-cover">
                      <img src={album.images[0].url} />
                    </div>
                    <div className="result-box-card-title">
                      <h6>{album.name}</h6>
                      <p>{album.artists[0].name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {showTag[3] ? (
        <>
          <h2>Playlists</h2>
          <div className="search-result">
            {props.searchPlaylists.map((playlist, i) => {
              return (
                <div className="result-box in-bl" onClick={() => window.open(`${playlist.external_urls.spotify}`, "_blank")}>
                  <div className="result-box-card">
                    <div className="result-box-card-cover">
                      <img src={playlist.images[0].url} />
                    </div>
                    <div className="result-box-card-title">
                      <p style={{ fontWeight: "700" }}>{playlist.name}</p>
                      <p style={{ fontSize: "13px" }}>{playlist.owner.display_name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SearchPage;
