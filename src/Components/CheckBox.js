import "../App.css";

function FeaturedPlaylists() {
  return (
    <>
      <h2>지금 무슨 음악 듣나요?</h2>

      <div className="search-result">
        {tracks.map((track, i) => {
          return trackTag ? (
            <div className="result-box col-3" onClick={() => window.open(`${tracks[i].external_urls.spotify}`, "_blank")}>
              <div className="result-box-card">
                <div className="result-box-card-cover">
                  <img src={tracks[i].album.images[0].url} />
                </div>
                <div className="result-box-card-title">
                  <p style={{ fontWeight: "700" }}>{tracks[i].name}</p>
                  <p style={{ fontSize: "13px" }}>{tracks[i].artists[0].name}</p>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          );
        })}
      </div>
    </>
  );
}

export default FeaturedPlaylists;
