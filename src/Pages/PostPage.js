import "./PostPage.css";
import { useState } from "react";

function PostPage(props) {
  const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []); // 로컬스토리지에서 저장된 데이터를 가져옵니다.

  return (
    <div className="container">
      <div className="post-main">
        {selectedTracks.length > 0 ? (
          selectedTracks.map((track) => (
            <div className="post-box in-bl">
              <div>
                <img src={track.album.images[0].url} alt={track.name} />

                <div className="post-box-title">
                  <div>
                    <h6>{track.name}</h6>
                    <p>{track.artists[0].name}</p>
                  </div>
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            </div>
          ))
        ) : (
          <p>No selected tracks yet.</p>
        )}
      </div>
    </div>
  );
}

export default PostPage;
