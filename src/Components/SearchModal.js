import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function SearchModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">내가 찾는 음악</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.selectedTracks.length > 0 ? (
            props.selectedTracks.map((track, i) => (
              <div key={i} className="result-box in-bl" onClick={() => window.open(`${track.external_urls.spotify}`, "_blank")}>
                <div className="result-box-card">
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
          <a style={{ textDecoration: "none", color: "#F2F2F2", transition: "color 0.2s" }} href="/post">
            음악담기
          </a>
        </Button>
        <Button variant="dark" onClick={props.onHide}>
          계속담기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
