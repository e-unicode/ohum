import "../App.css";
import { useState } from "react";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="search-form">
      <div className="form" style={{ width: "100%" }}>
        <input
          className="search-input"
          type="input"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              console.log("pressed");
            }
          }}
          onChange={(e) => console.log(e.target.value)}
          placeholder="노래 제목, 가수 이름, 관련 키워드를 입력하세요."
          required=""
        />
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className="search-enter"
        >
          찾기
        </button>
      </div>
    </div>
  );
}

export default Search;
