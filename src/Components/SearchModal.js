import Modal from "react-bootstrap/Modal";

function SearchModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        <h2>Selected Tracks</h2>
        {props.selectedTracks.length > 0 ? (
          props.selectedTracks.map((track, i) => (
            <div key={i} className="result-box in-bl">
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
        <button path="/list">Go List</button>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;