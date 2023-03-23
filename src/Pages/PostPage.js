import "./PostPage.css";
import { useState } from "react";

function PostPage(props) {
  const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []); // 로컬스토리지에서 저장된 데이터를 가져옵니다.

  return (
    <div className="post-main container">
      {selectedTracks.length > 0 ? (
        selectedTracks.map((track) => (
            <div className="post-box">
              <div className="result-box-card-cover">
                <img src={track.album.images[0].url} alt={track.name} />
                <div className="post-box-user">
                  <img src="oh-um-logo.jpg" />
                  <div className="post-box-user-name">
                    <h6>user name</h6>
                    <p>지금 날씨: {props.weather}</p>
                  </div>
                  <div className="post-box-like">
                    <p>like</p>
                  </div>
                </div>
                <div className="post-box-card-title">
                  <p>{track.name}</p>
                  <p style={{ fontSize: "30px", fontWeight: "100" }}>{track.artists[0].name}</p>
                </div>
              </div>
            </div>
        ))
      ) : (
        <p>No selected tracks yet.</p>
      )}
    </div>
  );
}

export default PostPage;
