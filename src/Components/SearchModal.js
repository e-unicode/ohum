import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function SearchModal(props) {
  let navigate = useNavigate();

  const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []);
  const [selectedTracksIds, setSelectedTracksIds] = useState(JSON.parse(localStorage.getItem("selectedTracksIds")) || []);

  const handleRemoveTrack = (track) => {
  const updatedTracks = selectedTracks.filter((t) => t.id !== track.id);
  const updatedTrackIds = selectedTracksIds.filter((id) => id !== track.id);
    setSelectedTracks(updatedTracks);
    setSelectedTracksIds(updatedTrackIds);
    localStorage.setItem("selectedTracks", JSON.stringify(updatedTracks));
    localStorage.setItem("selectedTracksIds", JSON.stringify(updatedTrackIds));
  };

  useEffect(() => {
    setSelectedTracks(JSON.parse(localStorage.getItem("selectedTracks")) || []);
    setSelectedTracksIds(JSON.parse(localStorage.getItem("selectedTracksIds")) || []);
  }, [props.show]);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">MY PLAYLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>선택한 트랙은 제거됩니다.</p>
          {selectedTracks.length > 0 ? (
            selectedTracks.map((track, i) => (
              <div key={i} className="result-box in-bl">
                <div className="result-box-card" onClick={() => handleRemoveTrack(track)}>
                  <div className="result-box-card-cover">
                    <img src={track.album.images[0].url} alt={track.name} />
                  </div>
                  <div className="result-box-card-title">
                    <h6>{track.name}</h6>
                    <p>{track.artists[0].name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No selected tracks yet.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark">
          <a
            style={{ textDecoration: "none", color: "#F2F2F2", transition: "color 0.2s" }}
            onClick={() => {
              navigate("/post");
            }}
          >
            CREATE MY PLAYLIST
          </a>
        </Button>
        <Button variant="dark" onClick={props.onHide}>
          KEEP GOING
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
