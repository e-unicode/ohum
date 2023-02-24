import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";

function SearchPage(props) {
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [artistPlaylists, setArtistPlaylists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  async function searchSpotify() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + props.accessToken,
      },
    };

    let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchParams({ q: searchInput });
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
                }}
                className="search-enter"
              >
                찾기
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="post-content">
        <div className="post-content-side">
          <Banner />
        </div>

        <div className="post-content-main row">
          <div className="search-result col">
            <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>TopTracks</h2>
            <div className="post-content-result">
              {topTracks.map((topTrack, i) => {
                return (
                  <div className="result-box" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
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
          </div>

          <div className="search-result col">
            <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>Albums</h2>
            <div className="post-content-result">
              {albums.map((album, i) => {
                return (
                  <div className="result-box" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
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
          </div>

          <div className="search-result col">
            <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>Playlists</h2>
            <div className="post-content-result">
              {artistPlaylists.map((artistPlaylist, i) => {
                return (
                  <div className="result-box" onClick={() => window.open(`${artistPlaylist.external_urls.spotify}`, "_blank")}>
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
        </div>
      </div>
    </>
  );
}

export default SearchPage;
