import "../App.css";
import Banner from "../Components/Banner";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PostBox from "../Components/PostBox";

function PostPage(props) {
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [artistPlaylists, setArtistPlaylists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
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

  async function searchSpotify() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        // setSearchParams({ q: searchInput });
        return data.artists.items[0].id;
      });

    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });

    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?market=KR", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.tracks);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + artistID + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtistPlaylists(data.playlists.items);
      });

    document.querySelector(".search-enter").click();
  }

  return (
    <>
      <div className="post-top">
        <div className="post-top-logo logo-font">
          {/* <img src="oh-um-logo.jpg" /> */}
          <div>
            <p>음악 취향 공유 플랫폼</p>
            <h4>오늘 음악 맑음</h4>
          </div>
        </div>
        <form action="/post" method="POST">
          <div className="search-form">
            <div className="form">
              <input
                className="search-input"
                type="input"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    searchSpotify();
                    setSearchInputTag(true);
                  }
                }}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                placeholder="노래 제목, 가수 이름, 관련 키워드를 입력하세요."
                name="search"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  searchSpotify();
                  setSearchInputTag(true);
                }}
                className="search-enter"
              >
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </button>
            </div>
          </div>
        </form>
        <div className="post-top-mood">
          <p>{props.now}</p>
          <p>{props.weather}</p>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
      <div className="post-side">
        <Banner />
      </div>
      <div className="post-content">

        {searchInputTag ? (
          <div className="post-content-main">
            <h2>TopTracks</h2>
            <div className="search-result">
              {topTracks.map((topTrack, i) => {
                return (
                  <div className="result-box col-3" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={topTrack.album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{topTrack.name}</p>
                        <p style={{ fontSize: "13px" }}>{topTrack.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2>Albums</h2>
            <div className="search-result">
              {albums.map((album, i) => {
                return (
                  <div className="result-box col-3" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{album.name}</p>
                        <p style={{ fontSize: "13px" }}>{album.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2>Playlists</h2>
            <div className="search-result">
              {artistPlaylists.map((artistPlaylist, i) => {
                return (
                  <div className="result-box col-3" onClick={() => window.open(`${artistPlaylist.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={artistPlaylist.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{artistPlaylist.name}</p>
                        <p style={{ fontSize: "13px" }}>{artistPlaylist.owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="post-content-main">
            <div className="post-content-post-box">
              <PostBox />
              <PostBox />
              <PostBox />
              <PostBox />
              <PostBox />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostPage;
