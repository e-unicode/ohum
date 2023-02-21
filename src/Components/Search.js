import "../App.css";

function Search(props) {
  return (
    <div className="search-form">
      <div className="form" style={{ width: "100%" }}>
        <input
          className="search-input"
          type="input"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              props.searchSpotify();
            }
          }}
          onChange={(e) => props.setSearchInput(e.target.value)}
          placeholder="노래 제목, 가수 이름, 관련 키워드를 입력하세요."
          required=""
        />
        <button
          onClick={props.searchSpotify}
          className="search-enter"
        >
          찾기
        </button>
      </div>
    </div>
  );
}

export default Search;
