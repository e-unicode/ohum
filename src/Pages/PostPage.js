import "../App.css";
import Banner from "../Components/Banner";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PostBox from "../Components/PostBox";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function PostPage(props) {
  //검색시 가장 첫 줄
  const [searchArtist, setSearchArtist] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
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
  const [trackTag, setTrackTag] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistTag, setArtistTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);

  async function searchSpotify() {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };
    ////////////////////////////////////////////////// 검색시 가장 첫 줄 //////////////////////////////////////////////////
    //검색한 내용과 가장 관련있는 아티스트 가져오기
    let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        // setSearchParams({ q: searchInput });
        setSearchArtist(data.artists.items);
        setArtistName(data.artists.items[0].name);
        return data.artists.items[0].id;
      });

    //해당 아티스트의 탑트랙10 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?market=KR", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.tracks);
      });

    //해당 아티스트의 앨범 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
        console.log(data.items);
      });

    //검색한 내용의 플레이리스트 가져오기: 아티스트의 플레이리스트를 가져오면 결과가 없는 경우가 많음(공식 플리여도 제공되지 않는 경우가 많음)
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist,track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtistPlaylists(data.playlists.items);
        setTracks(data.tracks.items);
      });

    // document.querySelector(".search-enter").click();
  }

  return (
    <div className="post">
      <div className="post-top">
        <Navbar key="md" expand="xxxl">
          <Container fluid>
            <div className="post-top-mood">
              <div>
                <p>{props.now}</p>
                <h4>{props.weather}</h4>
              </div>
            </div>
            <div className="post-top-logo">
              <div>
                <p>음악 취향 공유 플랫폼</p>
                <h4>오늘 음악 맑음</h4>
              </div>
            </div>
            <div className="post-top-nav">
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />

              <Navbar.Offcanvas id="offcanvasNavbar-expand-md" aria-labelledby="offcanvasNavbarLabel-expand-md" placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                    오늘 음악 맑음<span style={{ display: "block", fontSize: "13.3px" }}>음악 취향 공유 플랫폼</span>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <form action="/post" method="POST" className="w-100">
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
                          placeholder="Discover the Perfect Music Track for Every Moment."
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
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">#오늘음악</Nav.Link>
                    <Nav.Link href="#action2">#음악추천</Nav.Link>
                    <Nav.Link href="#action2">#내음악</Nav.Link>
                    <Nav.Link href="#action2">로그아웃</Nav.Link>

                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
      </div>
      <div className="post-main flex">
        <div className="post-side">
          <Banner />
        </div>
        <div className="post-content">
          {searchInputTag ? (
            <>
              <h2>{artistName}의 TopTracks</h2>
              <div className="search-result">
                {topTracks.map((topTrack, i) => {
                  return (
                    <div className="result-box in-bl" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
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

              <h2>Tracks</h2>
              <div className="search-result">
                {tracks.map((track, i) => {
                  return (
                    <div className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                      <div className="result-box-card">
                        <div className="result-box-card-cover">
                          <img src={track.album.images[0].url} />
                        </div>
                        <div className="result-box-card-title">
                          <p style={{ fontWeight: "700" }}>{track.name}</p>
                          <p style={{ fontSize: "13px" }}>{track.artists[0].name}</p>
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
                    <div
                      // style={{ width: "48%" }}
                      className="result-box in-bl"
                      onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}
                    >
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
                    <div
                      // style={{ width: "48%" }}
                      className="result-box in-bl"
                      onClick={() => window.open(`${artistPlaylist.external_urls.spotify}`, "_blank")}
                    >
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
            </>
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
      </div>
    </div>
  );
}

export default PostPage;
