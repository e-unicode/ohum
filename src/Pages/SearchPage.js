import "./SearchPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import SearchModal from "../Components/SearchModal.js";

function SearchPage(props) {
  //인덱스 보여주기
  const [index, setIndex] = useState(["TopTrack", "Tracks", "Albums", "Playlists"]);
  const [count, setCount] = useState([1, 1, 1, 1]);
  const [showTag, setShowTag] = useState([true, true, true, true]);

  //모달보여주기
  const [modalShow, setModalShow] = useState(false);

  const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []); // 로컬스토리지에서 저장된 데이터를 가져옵니다.

  const handleSaveTrack = (track) => {
    setSelectedTracks([...selectedTracks, track]); // 기존 데이터가 있는 경우 복사해서 다시 넣어줍니다.
    localStorage.setItem("selectedTracks", JSON.stringify([...selectedTracks, track])); // stringify 후 로컬스토리지에 저장합니다.
  };

  return (
    <div className="post-main container">
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
          {props.searchTopTracks.length > 0 ? (
            <div className="search-result">
              {props.searchTopTracks.map((topTrack) => {
                return (
                  <div id={topTrack.id} className="result-box in-bl" onClick={() => handleSaveTrack(topTrack)}>
                    <div className="result-box-card" onClick={() => setModalShow(true)}>
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
          ) : (
            <p>Not yet</p>
          )}
        </>
      ) : null}
      {showTag[1] ? (
        <>
          <h2>Tracks</h2>
          {props.searchTracks.length > 0 ? (
            <div className="search-result">
              {props.searchTracks.map((track) => {
                return (
                  <div id={track.id} className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card" onClick={() => setModalShow(true)}>
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
          ) : (
            <p>Not yet</p>
          )}
        </>
      ) : null}
      {showTag[2] ? (
        <>
          <h2>Albums</h2>
          {props.searchAlbums.length > 0 ? (
            <div className="search-result">
              {props.searchAlbums.map((album) => {
                return (
                  <div id={album.id} className="result-box in-bl" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card" onClick={() => setModalShow(true)}>
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
          ) : (
            <p>Not yet</p>
          )}
        </>
      ) : null}
      {showTag[3] ? (
        <>
          <h2>Playlists</h2>
          {props.searchPlaylists.length > 0 ? (
            <div className="search-result">
              {props.searchPlaylists.map((playlist) => {
                return (
                  <div id={playlist.id} className="result-box in-bl" onClick={() => window.open(`${playlist.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card" onClick={() => setModalShow(true)}>
                      <div className="result-box-card-cover">
                        <img src={playlist.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <h6>{playlist.name}</h6>
                        <p>{playlist.owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Not yet</p>
          )}
        </>
      ) : null}

      <SearchModal show={modalShow} selectedTracks={selectedTracks} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default SearchPage;
