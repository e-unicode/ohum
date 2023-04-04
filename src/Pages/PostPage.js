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
      <h2>지금 뭐 듣지🎵</h2>
      {selectedTracks.length > 0 ? (
        <div className="search-result">
          {selectedTracks.map((track) => (
            <div className="result-box in-bl">
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
      ) : (
        <p>No selected tracks yet.</p>
      )}
      <h2>이 음악은 어때요?🎵</h2>
      {props.recommendedTracks.length > 0 ? (
        <div className="search-result">
        {props.recommendedTracks.map((track) => (
          <div className="result-box in-bl">
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
      ) : (
        <p>No selected tracks yet.</p>
      )}
    </div>
  );
}

export default PostPage;
