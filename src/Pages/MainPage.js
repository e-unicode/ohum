import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import NavScrollExample from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Configuration, OpenAIApi } from "openai";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import PostPage from "./PostPage";
import ListPage from "./ListPage";
import SearchPage from "./SearchPage";
import AIPage from "./AIPage";

function MainPage(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState(false);

  //검색
  const [searchArtist, setSearchArtist] = useState([]);
  const [searchArtistName, setSearchArtistName] = useState("");
  const [searchTopTracks, setSearchTopTracks] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);
  const [searchPlaylists, setSearchPlaylists] = useState([]);

  //index check
  const [index, setIndex] = useState(["Top10", "Tracks", "Albums", "Playlists"]);
  const [count, setCount] = useState([1, 1, 1, 1]);
  const [showTag, setShowTag] = useState([true, true, true, true]);

  //AI추천
  const [AITrackList, setAITrackList] = useState([]);
  const [AITrackListTag, setAITrackListTag] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  //오늘 Hot 플리
  const [hotPlaylist, setHotPlaylist] = useState([]);
  const [hotPlaylistTag, setHotPlaylistTag] = useState(false);

  //음악 온도 플리
  const [tempMusicList, setTempMusicList] = useState([]);
  const [tempMusicListTag, setTempMusicListTag] = useState(false);

  //음악 mood 플리
  const [moodMusicList, setMoodMusicList] = useState([]);
  const [moodMusicListTag, setMoodMusicListTag] = useState(false);

  async function searchSpotify() {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    // 검색시 가장 첫 줄
    //검색한 내용과 가장 관련있는 아티스트 가져오기
    let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        // setSearchParams({ q: searchInput });
        setSearchArtist(data.artists.items);
        setSearchArtistName(data.artists.items[0].name);
        return data.artists.items[0].id;
      });

    //해당 아티스트의 탑트랙10 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?market=KR", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchTopTracks(data.tracks);
      });

    //해당 아티스트의 앨범 가져오기
    await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums?include_groups=album&market=KR&limit=50", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchAlbums(data.items);
      });

    //검색한 내용의 플레이리스트 가져오기: 아티스트의 플레이리스트를 가져오면 결과가 없는 경우가 많음(공식 플리여도 제공되지 않는 경우가 많음)
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist,track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setSearchPlaylists(data.playlists.items);
        setSearchTracks(data.tracks.items);
      });
  }

  //접속시 노래 추천
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

    //추천 아티스트로 아티스트와 탑트랙 보여주기
    await fetch("https://api.spotify.com/v1/search?q=" + props.AITrack + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAITrackList(data.tracks.items);
      })
      .then(() => {
        setAITrackListTag(true);
      });

    //오늘 핫 플레이리스트
    await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${props.place}`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setHotPlaylist(data.playlists.items);
      })
      .then(() => {
        setHotPlaylistTag(true);
      });

    //음악온도 플레이리스트
    await fetch("https://api.spotify.com/v1/search?q=" + props.tempMusic + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTempMusicList(data.playlists.items);
      })
      .then(() => {
        setTempMusicListTag(true);
      });

    //오늘 음악 mood 플레이리스트
    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setMoodMusicList(data.playlists.items);
      })
      .then(() => {
        setMoodMusicListTag(true);
      });
  }

  return (
    <div className="post">
      <div className="post-top">
        <Navbar key="xxxl" expand="xxxl">
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
              <div>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xxxl" />

                <Navbar.Offcanvas id="offcanvasNavbar-expand-xxxl" aria-labelledby="offcanvasNavbarLabel-expand-xxxl" placement="end">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel-expand-xxxl">
                    <span style={{ display: "block", fontSize: "13.3px" }}>음악 취향 공유 플랫폼</span>오늘 음악 맑음
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
                            placeholder="취향을 발견해보세요."
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
                      <Nav.Link href="/">#음악추천</Nav.Link>
                      <Nav.Link href="/list">#음악피드</Nav.Link>
                      <Nav.Link href="/post">#공유하기</Nav.Link>
                      <Nav.Link href="/enter">#로그아웃</Nav.Link>
                      <Nav.Link href="/join">#가입하기</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {searchInputTag ? (
                <SearchPage
                  index={index}
                  showTag={showTag}
                  count={count}
                  searchArtistName={searchArtistName}
                  searchTopTracks={searchTopTracks}
                  searchTracks={searchTracks}
                  searchAlbums={searchAlbums}
                  searchPlaylists={searchPlaylists}
                />
              ) : (
                <AIPage
                  AITrackListTag={AITrackListTag}
                  randomNum={props.randomNum}
                  AITrackList={AITrackList}
                  hotPlaylistTag={hotPlaylistTag}
                  hotPlaylist={hotPlaylist}
                  randomNum2={props.randomNum2}
                  temperature={props.temperature}
                  tempMusicListTag={tempMusicListTag}
                  tempMusicList={tempMusicList}
                  mood={props.mood}
                  moodMusicListTag={moodMusicListTag}
                  moodMusicList={moodMusicList}
                />
              )}
            </>
          }
        />
        <Route
          path="/list"
          element={
            <>
              {searchInputTag ? (
                <SearchPage
                  index={index}
                  showTag={showTag}
                  count={count}
                  searchArtistName={searchArtistName}
                  searchTopTracks={searchTopTracks}
                  searchTracks={searchTracks}
                  searchAlbums={searchAlbums}
                  searchPlaylists={searchPlaylists}
                />
              ) : (
                <ListPage />
              )}
            </>
          }
        />
        <Route
          path="/post"
          element={
            <>
              {searchInputTag ? (
                <SearchPage
                  index={index}
                  showTag={showTag}
                  count={count}
                  searchArtistName={searchArtistName}
                  searchTopTracks={searchTopTracks}
                  searchTracks={searchTracks}
                  searchAlbums={searchAlbums}
                  searchPlaylists={searchPlaylists}
                />
              ) : (
                <PostPage />
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MainPage;
