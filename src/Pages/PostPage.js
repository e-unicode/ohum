import "./PostPage.css";
import { useState, useEffect } from "react";

function PostPage(props) {
  //로컬스토리지에서 저장된 데이터를 가져옵니다.
  const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []);


  useEffect(() => {
    if (props.weatherTag) {
      props.getRecommendations();
    }
  }, [props.weatherTag]);

  return (
    <div className="post-main container">
      {selectedTracks.length > 0 ? (
        <>
          <h2>Discover my music selection.</h2>
          <div className="search-result">
            {selectedTracks.map((track) => (
              <div className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                <div className="result-box-card">
                  <div className="result-box-card-cover">
                    <img src={track.album.images[0].url} alt={track.name} />
                  </div>
                  <div className="result-box-card-title">
                    <div>
                      <h6>{track.name}</h6>
                      <p>{track.artists[0].name}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {props.recommendedTracks.length > 0 ? (
            <>
              <h2>Music for you🎵</h2>
              <div className="search-result">
                {props.recommendedTracks.map((track) => (
                  <div className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={track.album.images[0].url} alt={track.name} />
                      </div>
                      <div className="result-box-card-title">
                        <div>
                          <h6>{track.name}</h6>
                          <p>{track.artists[0].name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>취향저격 음악을 준비중이에요. 기다려주세요 ❣</h2>
          )}
        </>
      ) : (
        <h2>아직 담은 음악이 없어요!</h2>
      )}
    </div>
  );
}

export default PostPage;
