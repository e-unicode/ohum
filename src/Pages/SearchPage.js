import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import NavScrollExample from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Configuration, OpenAIApi } from "openai";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function SearchPage(props) {
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
  const [AITrack, setAITrack] = useState("");
  const [AITrackList, setAITrackList] = useState([]);
  const [AITrackListTag, setAITrackListTag] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  //오늘 Hot 플리
  const [hotPlaylist, setHotPlaylist] = useState([]);
  const [hotPlaylistTag, setHotPlaylistTag] = useState(false);

  //음악 온도 플리
  const [tempMusic, setTempMusic] = useState("");
  const [tempMusicList, setTempMusicList] = useState([]);
  const [tempMusicListTag, setTempMusicListTag] = useState(false);

  //음악 mood 플리
  const [moodMusicList, setMoodMusicList] = useState([]);
  const [moodMusicListTag, setMoodMusicListTag] = useState(false);

  useEffect(() => {
    setCount([1, 1, 1, 1]);
    setShowTag([true, true, true, true]);
    setCurrentTrack(0);
  }, []);

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

  //ai 추천 가져오기
  useEffect(() => {
    const configuration = new Configuration({
      apiKey: props.openai_api_key,
    });
    const openai = new OpenAIApi(configuration);

    //ai로 메인 추천 트랙 불러오기
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `오늘과 잘 어울리는 가수를 추천해주세요. 검색어에 사용할 수 있도록 간결하게 답변해주세요.`,
        // prompt: `Please recommend a song that goes well with today. Please answer in the form of singer and title so that you can use it for search terms.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        setAITrack(result.data.choices[0].text);
      });

    // ai로 음악온도플리 불러오기
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Please recommend a song with a music temperature of ${props.temperature} degrees.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        setTempMusic(result.data.choices[0].text);
      });
  }, []);

  //접속시 노래 추천
  useEffect(() => {
    if (props.mood) {
      recommendSpotify();
    }
  }, []);

  async function recommendSpotify() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    //추천 아티스트로 아티스트와 탑트랙 보여주기
    await fetch("https://api.spotify.com/v1/search?q=" + AITrack + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAITrackList(data.tracks.items);
        console.log(data.tracks.items);
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
    await fetch("https://api.spotify.com/v1/search?q=" + tempMusic + "&type=playlist", searchParameters)
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
        console.log(data.playlists.items);
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
                      <Nav.Link href="/post">#오늘음악</Nav.Link>
                      <Nav.Link href="/search">#음악추천</Nav.Link>
                      <Nav.Link href="#">#내음악</Nav.Link>
                      <Nav.Link href="/">로그아웃</Nav.Link>
                      {/* <NavDropdown title="마이페이지" id="offcanvasNavbarDropdown-expand-xxxl">
<NavDropdown.Item href="#action3">마이페이지</NavDropdown.Item>
<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
</NavDropdown> */}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
      <div className="post-main flex">
        <div className="post-content">
          {searchInputTag ? (
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
                  <h2>{searchArtistName}의 TopTracks</h2>
                  <div className="search-result">
                    {searchTopTracks.map((topTrack, i) => {
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
                    {searchTracks.map((track, i) => {
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
                    {searchAlbums.map((album, i) => {
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
                    {searchPlaylists.map((playlist, i) => {
                      return (
                        <div
                          // style={{ width: "48%" }}
                          className="result-box in-bl"
                          onClick={() => window.open(`${playlist.external_urls.spotify}`, "_blank")}
                        >
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
          ) : (
            <>
              {AITrackListTag ? (
                <div style={{ overflow: "hidden" }}>
                  <div className="AI-Track-container">
                    {AITrackListTag ? (
                      <div className="AI-Track-box">
                        <div className="main-track" style={{ backgroundImage: `url(${AITrackList[props.randomNum].album.images[0].url})` }}></div>
                        <div className="main-keyword">
                            <div className="main-track-title" onClick={() => window.open(`${AITrackList[props.randomNum].external_urls.spotify}`, "_blank")}>
                              <h1>{AITrackList[props.randomNum].name}</h1>
                              <h3>{AITrackList[props.randomNum].artists[0].name}</h3>
                            </div>
                          </div>
                      </div>
                      
                    ) : (
                      <Loading />
                    )}
                    {/* {AITrackList.map((AITrack, i) => {
                      return (
                        <div className="AI-Track-box">
                      
                          <div className="main-track">
                            <img src={AITrack.album.images[0].url} />
                          </div>
                          <FontAwesomeIcon
                            className="main-track-icon icon-left"
                            icon={faArrowLeft}
                            onClick={(e) => {
                              if (currentTrack == 0) {
                                e.preventDefault();
                              } else {
                                document.querySelector(".AI-Track-container").style.transform = "translateX(-" + (currentTrack - 1) + "00vw)";
                                setCurrentTrack((currentTrack) => {
                                  return currentTrack - 1;
                                });
                              }
                            }}
                          />
                          <FontAwesomeIcon
                            className="main-track-icon icon-right"
                            icon={faArrowRight}
                            onClick={(e) => {
                              if (currentTrack == 19) {
                                e.preventDefault();
                              } else {
                                document.querySelector(".AI-Track-container").style.transform = "translateX(-" + (currentTrack + 1) + "00vw)";
                                setCurrentTrack((currentTrack) => {
                                  return currentTrack + 1;
                                });
                              }
                            }}
                          />
                          <div className="main-keyword">
                            <div className="main-track-title" onClick={() => window.open(`${AITrack.external_urls.spotify}`, "_blank")}>
                              <h1>{AITrack.name}</h1>
                              <h3>{AITrack.artists[0].name}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    })} */}
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
                      {hotPlaylistTag ? (
                        <div>
                          <img
                            src={hotPlaylist[props.randomNum2].images[0].url}
                            onClick={() => window.open(`${hotPlaylist[props.randomNum2].external_urls.spotify}`, "_blank")}
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
                      {tempMusicListTag ? (
                        <div>
                          <img
                            src={tempMusicList[0].images[0].url}
                            onClick={() => window.open(`${tempMusicList[0].external_urls.spotify}`, "_blank")}
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
                      {moodMusicListTag ? (
                        <div>
                          <img
                            src={moodMusicList[0].images[0].url}
                            onClick={() => window.open(`${moodMusicList[0].external_urls.spotify}`, "_blank")}
                          />
                        </div>
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
