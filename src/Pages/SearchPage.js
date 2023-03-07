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
  const [arrowCount, setArrowCount] = useState(0);

  const [searchInputTag, setSearchInputTag] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [playlistCardTag, setPlaylistCardTag] = useState(false);
  const [trackCardTag, setTrackCardTag] = useState(false);
  const [artistCardTag, setArtistCardTag] = useState(false);
  // const [playlists, setPlaylists] = useState([]);
  const [playlistTag, setPlaylistTag] = useState(false);
  const [trackTag, setTrackTag] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistTag, setArtistTag] = useState(false);
  const [추천음악playlists, set추천음악Playlists] = useState([]);
  const [추천음악playlistTag, set추천음악PlaylistTag] = useState(false);
  const [추천음악tracks, set추천음악Tracks] = useState([]);
  const [추천음악trackTag, set추천음악TrackTag] = useState(false);
  const [추천아티스트, set추천아티스트] = useState([]);
  const [추천아티스트Tag, set추천아티스트Tag] = useState(false);
  const [추천음악2playlists, set추천음악2Playlists] = useState([]);
  const [추천음악2playlistTag, set추천음악2PlaylistTag] = useState(false);
  const [추천음악2tracks, set추천음악2Tracks] = useState([]);
  const [추천음악2trackTag, set추천음악2TrackTag] = useState(false);
  const [추천음악2artists, set추천음악2Artists] = useState([]);
  const [추천음악2artistTag, set추천음악2ArtistTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const [추천플리, set추천플리] = useState([]);
  const [추천플리Tag, set추천플리Tag] = useState(false);

  useEffect(() => {
    setCount([1, 1, 1, 1]);
    setShowTag([true, true, true, true]);
  }, []);

  async function searchSpotify() {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };
    ////// 검색시 가장 첫 줄
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

    // document.querySelector(".search-enter").click();
  }

  //ai키워드 가져오기
  useEffect(() => {
    const configuration = new Configuration({
      apiKey: props.openai_api_key,
    });
    const openai = new OpenAIApi(configuration);

    //ai로 추천 트랙 불러오기
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `오늘과 잘 어울리는 노래 한곡을 추천해주세요. 검색어에 사용할 수 있도록 가수와 제목으로만 답변해주세요.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        setAITrack(result.data.choices[0].text);
        console.log(result.data.choices[0].text);
      });

    //ai로 추천음악 키워드2 불러오기
    // openai
    //   .createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `The current time is. Please recommend a movie that goes well with now. The answer is the title of the movie. Just answer the title.`,
    //     temperature: 0.7,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //   })
    //   .then((result) => {
    //     set추천음악2(result.data.choices[0].text);
    //     console.log(result.data.choices[0].text);
    //   });
  }, []);

  //mood가 바뀔때마다 노래 다시 추천
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
    await fetch("https://api.spotify.com/v1/search?q=" + AITrack + "&type=track", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setAITrackList(data.tracks.items);
        console.log(data);
      })
      .then(() => {
        setAITrackListTag(true);
      });

    // //mood와 관련된 앨범, 트랙 , 플레이리스트 찾기
    // await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist,track,artist", searchParameters)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // setPlaylists(data.playlists.items);
    //     // setTracks(data.tracks.items);
    //     setArtists(data.artists.items);
    //   })
    //   .then(() => {
    //     setPlaylistTag(true);
    //     setTrackTag(true);
    //     setArtistTag(true);
    //   });

    // //추천 아티스트로 아티스트와 탑트랙 보여주기
    // await fetch("https://api.spotify.com/v1/search?q=" + props.ai아티스트 + "&type=artist", searchParameters)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     set추천아티스트(data.artists);
    //     console.log("아티스트", data.artists);
    //   })
    //   .then(() => {
    //     set추천아티스트Tag(true);
    //   });

    // //추천음악 키워드2와 관련된 앨범, 트랙 찾기
    // await fetch("https://api.spotify.com/v1/search?q=" + props.추천음악2 + "&type=playlist,track,artist", searchParameters)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     set추천음악2Playlists(data.playlists.items);
    //     set추천음악2Tracks(data.tracks.items);
    //     set추천음악2Artists(data.artists.items);
    //   })
    //   .then(() => {
    //     set추천음악2PlaylistTag(true);
    //     set추천음악2TrackTag(true);
    //     set추천음악2ArtistTag(true);
    //   });

    // //추천 플레이리스트
    // await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${props.place}`, searchParameters)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     set추천플리(data.playlists.items);
    //   })
    //   .then(() => {
    //     set추천플리Tag(true);
    //   });
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
            <Container>
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
            </Container>
          ) : (
            <>
              {AITrackListTag ? (
                <div className="AI-Track">
                  <div className="main-track" style={{ backgroundImage: `url(${AITrackList[randomNum].album.images[0].url})` }}></div>
                  <FontAwesomeIcon className="main-track-icon icon-left" icon={faArrowLeft} />
                  <FontAwesomeIcon className="main-track-icon icon-right" icon={faArrowRight} />
                  <div className="main-keyword">
                    <div className="main-track-title" onClick={() => window.open(`${AITrackList[randomNum].external_urls.spotify}`, "_blank")}>
                      <h1>{AITrackList[randomNum].name}</h1>
                      <h3>{AITrackList[randomNum].artists[0].name}</h3>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
