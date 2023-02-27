import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchPage(props) {
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

  //mood가 바뀔때마다 노래 다시 추천
  useEffect(() => {
    if (props.mood) {
      recommendSpotify();
    }
  }, [props.mood]);

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

  async function recommendSpotify() {
    console.log("Search for " + props.mood);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
      })
      .then(() => {
        setPlaylistTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks.items);
        console.log(data.tracks.items);
      })
      .then(() => {
        setTrackTag(true);
      });

    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists.items);
      })
      .then(() => {
        setArtistTag(true);
      });
  }

  return (
    <>
      <div className="post-top">
        <div className="post-top-logo logo-font">
          <img src="oh-um-logo.jpg" />
          <h4>오늘 음악 맑음</h4>
          <p style={{ fontSize: "8px", letterSpacing: "5px", paddingLeft: "4px" }}>음악 취향 공유 플랫폼</p>
        </div>
        <form action="/post" method="POST">
          <div className="search-form">
            <div className="form" style={{ width: "100%" }}>
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
        <div className="post-top-mood">{props.mood}</div>
        <div style={{ clear: "both" }}></div>
      </div>
      <div className="post-content">
        <div className="post-content-side">
          <Banner />
        </div>

        {searchInputTag ? (
          <div className="post-content-main">
            <h2 style={{ color: "#053259", marginBottom: "10px", fontWeight: "900" }}>TopTracks</h2>
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
                        <p style={{ fontSize: "15px" }}>{topTrack.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 style={{ color: "#053259", marginBottom: "10px", fontWeight: "900" }}>Albums</h2>
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
                        <p style={{ fontSize: "15px" }}>{album.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 style={{ color: "#053259", marginBottom: "10px", fontWeight: "900" }}>Playlists</h2>
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
                        <p style={{ fontSize: "15px" }}>{artistPlaylist.owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="post-content-main">
            <h2 style={{ color: "#053259", marginBottom: "10px", fontWeight: "900" }}>지금과 어울리는 Tracks</h2>

            <div className="search-result">
              {tracks.map((track, i) => {
                return trackTag ? (
                  <div className="result-box col-3" onClick={() => window.open(`${tracks[i].external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={tracks[i].album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{tracks[i].name}</p>
                        <p style={{ fontSize: "15px" }}>{tracks[i].artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
