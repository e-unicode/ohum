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
  const [추천음악artists, set추천음악Artists] = useState([]);
  const [추천음악artistTag, set추천음악ArtistTag] = useState(false);
  const [추천음악2playlists, set추천음악2Playlists] = useState([]);
  const [추천음악2playlistTag, set추천음악2PlaylistTag] = useState(false);
  const [추천음악2tracks, set추천음악2Tracks] = useState([]);
  const [추천음악2trackTag, set추천음악2TrackTag] = useState(false);
  const [추천음악2artists, set추천음악2Artists] = useState([]);
  const [추천음악2artistTag, set추천음악2ArtistTag] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const [추천플리, set추천플리] = useState([]);
  const [추천플리Tag, set추천플리Tag] = useState(false);

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

    // await fetch("https://api.spotify.com/v1/search?q=" + artistID + "&type=playlist", searchParameters)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setArtistPlaylists(data.playlists.items);
    //   });

    //검색어와 관련된 앨범, 트랙 찾기
    await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=album,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.albums.items);
        console.log(data.artists.items);
        console.log(data.tracks.items);
      });

    document.querySelector(".search-enter").click();
  }

  async function recommendSpotify() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
    };

    //mood와 관련된 앨범, 트랙 , 플레이리스트 찾기
    await fetch("https://api.spotify.com/v1/search?q=" + props.mood + "&type=playlist,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
        console.log(data.playlists.items)
        setTracks(data.tracks.items);
        setArtists(data.artists.items);
      })
      .then(() => {
        setPlaylistTag(true);
        setTrackTag(true);
        setArtistTag(true);
      });

    //추천음악 키워드와 관련된 앨범, 트랙 찾기
    await fetch("https://api.spotify.com/v1/search?q=" + props.추천음악 + "&type=playlist,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        set추천음악Playlists(data.playlists.items);
        set추천음악Tracks(data.tracks.items);
        set추천음악Artists(data.artists.items);
      })
      .then(() => {
        set추천음악PlaylistTag(true);
        set추천음악TrackTag(true);
        set추천음악ArtistTag(true);
      });

    //추천음악 키워드2와 관련된 앨범, 트랙 찾기
    await fetch("https://api.spotify.com/v1/search?q=" + props.추천음악2 + "&type=playlist,track,artist", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        set추천음악2Playlists(data.playlists.items);
        set추천음악2Tracks(data.tracks.items);
        set추천음악2Artists(data.artists.items);
      })
      .then(() => {
        set추천음악2PlaylistTag(true);
        set추천음악2TrackTag(true);
        set추천음악2ArtistTag(true);
      });

    //추천 플레이리스트
    await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${props.place}`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        set추천플리(data.playlists.items);
      })
      .then(() => {
        set추천플리Tag(true);
      });
  }

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
                  <div
                    style={{ width: "15%" }}
                    className="result-box col-3"
                    onClick={() => window.open(`${topTrack.external_urls.spotify}`, "_blank")}
                  >
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
            {/* 추천플레이리스트 */}
            <h2>지금 무슨 음악 듣나요?</h2>
            <div className="search-result">
              {추천플리.map((플리, i) => {
                return 추천플리Tag ? (
                  <div style={{ width: "15%" }} className="result-box col-3" onClick={() => window.open(`${추천플리[i].external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천플리[i].images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천플리[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천플리[i].artist}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>

            {/* 추천음악 키워드 노래 */}
            <h2>지금 이 노래 어때요?</h2>
            <div className="search-result">
              {추천음악tracks.map((track, i) => {
                return 추천음악trackTag ? (
                  <div style={{ width: "15%" }} className="result-box col-3" onClick={() => window.open(`${추천음악tracks[i].external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천음악tracks[i].album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천음악tracks[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천음악tracks[i].name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                );
              })}
            </div>

            {/* 추천음악 키워드2 노래 */}
            <h2>오늘의 감정을 공유할 이 노래 어때요?</h2>
            <div className="search-result">
              {추천음악2tracks.map((track, i) => {
                return 추천음악2trackTag ? (
                  <div style={{ width: "15%" }} className="result-box col-3" onClick={() => window.open(`${추천음악2tracks[i].external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={추천음악2tracks[i].album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{추천음악2tracks[i].name}</p>
                        <p style={{ fontSize: "13px" }}>{추천음악2tracks[i].name}</p>
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
                  <div style={{ width: "15%" }} className="result-box col-3" onClick={() => window.open(`${playlists[i].external_urls.spotify}`, "_blank")}>
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
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
