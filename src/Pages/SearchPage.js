import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { UNSAFE_enhanceManualRouteObjects, useSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Configuration, OpenAIApi } from "openai";

function SearchPage(props) {
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [artistPlaylists, setArtistPlaylists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [playlistCardTag, setPlaylistCardTag] = useState(false);
  const [trackCardTag, setTrackCardTag] = useState(false);
  const [artistCardTag, setArtistCardTag] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistTag, setPlaylistTag] = useState(false);
  const [tracks, setTracks] = useState([]);
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
  ////////////////////////////////////////////////// 검색시 가장 첫 줄 //////////////////////////////////////////////////
  const [searchArtist, setSearchArtist] = useState([]);
  const [searchArtistTag, setSearchArtistTag] = useState(false);

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
        setSearchArtist(data.artists.items)
        setSearchArtistTag(true)
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
    });

    //검색한 내용의 플레이리스트 가져오기: 아티스트의 플레이리스트를 가져오면 결과가 없는 경우가 많음(공식 플리여도 제공되지 않는 경우가 많음)
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setArtistPlaylists(data.playlists.items);
      });


    ////////////////////////////////////////////////// 검색시 두번째 줄 //////////////////////////////////////////////////

    //검색어와 관련된 앨범, 트랙 찾기
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=album,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.albums.items);
        console.log(data.artists.items);
        console.log(data.tracks.items);
      });

    // document.querySelector(".search-enter").click();
  }

  // //ai키워드 가져오기
  // useEffect(() => {
  //   const configuration = new Configuration({
  //     apiKey: props.openai_api_key,
  //   });
  //   const openai = new OpenAIApi(configuration);

  //   //ai로 추천 아티스트 불러오기
  //   openai
  //     .createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `${now}, please recommend the best singer for this time.`,
  //       temperature: 0.7,
  //       max_tokens: 256,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     })
  //     .then((result) => {
  //       setAi아티스트(result.data.choices[0].text);
  //       console.log(result.data.choices[0].text);
  //     });

  //   //ai로 추천음악 키워드2 불러오기
  //   openai
  //     .createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `The current time is ${now}. Please recommend a movie that goes well with now. The answer is the title of the movie. Just answer the title.`,
  //       temperature: 0.7,
  //       max_tokens: 256,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     })
  //     .then((result) => {
  //       set추천음악2(result.data.choices[0].text);
  //       console.log(result.data.choices[0].text);
  //     });
  // }, []);

  // //mood가 바뀔때마다 노래 다시 추천
  // useEffect(() => {
  //   if (props.mood) {
  //     recommendSpotify();
  //   }
  // }, [props.mood]);

  // async function recommendSpotify() {
  //   var searchParameters = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + props.accessToken,
  //     },
  //   };

  //   //mood와 관련된 앨범, 트랙 , 플레이리스트 찾기
  //   await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist,track,artist", searchParameters)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPlaylists(data.playlists.items);
  //       setTracks(data.tracks.items);
  //       setArtists(data.artists.items);
  //     })
  //     .then(() => {
  //       setPlaylistTag(true);
  //       setTrackTag(true);
  //       setArtistTag(true);
  //     });

  //   //추천 아티스트로 아티스트와 탑트랙 보여주기
  //   await fetch("https://api.spotify.com/v1/search?q=" + props.ai아티스트 + "&type=artist", searchParameters)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       set추천아티스트(data.artists);
  //       console.log("아티스트", data.artists);
  //     })
  //     .then(() => {
  //       set추천아티스트Tag(true);
  //     });

  //   //추천음악 키워드2와 관련된 앨범, 트랙 찾기
  //   await fetch("https://api.spotify.com/v1/search?q=" + props.추천음악2 + "&type=playlist,track,artist", searchParameters)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       set추천음악2Playlists(data.playlists.items);
  //       set추천음악2Tracks(data.tracks.items);
  //       set추천음악2Artists(data.artists.items);
  //     })
  //     .then(() => {
  //       set추천음악2PlaylistTag(true);
  //       set추천음악2TrackTag(true);
  //       set추천음악2ArtistTag(true);
  //     });

  //   //추천 플레이리스트
  //   await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${props.place}`, searchParameters)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       set추천플리(data.playlists.items);
  //     })
  //     .then(() => {
  //       set추천플리Tag(true);
  //     });
  // }

  return (
    <>
      <div className="post-top">
        <div className="post-top-logo">
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
            <div className="search-result flex">
              {topTracks.map((topTrack, i) => {
                return (
                  <div style={{width:'15%'}} className="result-box col-1" onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}>
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

            <div className="flex">

            <h2 className="col-6">Albums</h2>
            <h2 className="col-6">Playlists</h2>
            </div>
            <div className="flex">
            <div className="search-result">
              {albums.map((album, i) => {
                return (
                  <div style={{width:'48%'}} className="result-box in-bl" onClick={() => window.open(`${album.external_urls.spotify}`, "_blank")}>
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
            <div className="search-result">
              {artistPlaylists.map((artistPlaylist, i) => {
                return (
                  <div style={{width:'48%'}} className="result-box in-bl" onClick={() => window.open(`${artistPlaylist.external_urls.spotify}`, "_blank")}>
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
          </div>
        ) : (
          <div className="post-content-main">
            {/* 추천음악 키워드 아티스트+탑트랙 */}
            <h2>{props.추천아티스트}</h2>
            <div className="search-result">
              {추천음악playlists.map((a, i) => {
                return 추천음악playlistTag ? (
                  <div
                    style={{ width: "20%" }}
                    className="result-box col-3"
                    onClick={() => window.open(`${추천음악playlists[i].external_urls.spotify}`, "_blank")}
                  >
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천음악playlists[i].images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천음악playlists[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천음악playlists[i].owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>

            {/* 추천음악 키워드2 트랙 */}
            <h2>오늘의 감정을 공유할 이 노래 어때요?</h2>
            <div className="search-result">
              {추천음악2tracks.map((track, i) => {
                return 추천음악2trackTag ? (
                  <div
                    style={{ width: "15%" }}
                    className="result-box col-3"
                    onClick={() => window.open(`${추천음악2tracks[i].external_urls.spotify}`, "_blank")}
                  >
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천음악2tracks[i].album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천음악2tracks[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천음악2tracks[i].artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>

            {/* 무드와 어울리는 플레이리스트 */}
            <h2>지금 분위기는 {props.mood}</h2>
            <div className="search-result">
              {playlists.map((playlist, i) => {
                return playlistTag ? (
                  <div
                    style={{ width: "15%" }}
                    className="result-box col-3"
                    onClick={() => window.open(`${playlists[i].external_urls.spotify}`, "_blank")}
                  >
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={playlists[i].images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{playlists[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{playlists[i].owner.display_name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>

            {/* 추천플레이리스트 */}
            <h2>지금 무슨 음악 듣나요?</h2>
            <div className="search-result">
              {추천플리.map((플리, i) => {
                return 추천플리Tag ? (
                  <div
                    style={{ width: "15%" }}
                    className="result-box col-3"
                    onClick={() => window.open(`${추천플리[i].external_urls.spotify}`, "_blank")}
                  >
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천플리[i].images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천플리[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천플리[i].owner.display_name}</p>
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
