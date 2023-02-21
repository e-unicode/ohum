import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Search from "../Components/Search";
import Banner from "../Components/Banner";

function SearchPage(props) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="post">
      <div className="post-top">
        <Search />
      </div>

      <div className="post-content">
        <div className="post-content-side">
          <Banner />
        </div>

        <div className="post-content-main">
          <div className="search-result">
            <h2 style={{ color: "#F2F2F2", marginBottom: "10px", fontWeight: "900" }}>Albums</h2>
            <div>
              {props.albums.map((album, i) => {
                return (
                  <div className="result-box">
                    <div className="result-box-card">
                      <div className="result-box-card-cover">
                        <img src={album.images[0].url} />
                      </div>
                      <div className="result-box-card-title">
                        <p style={{ fontWeight: "700" }}>{album.name}</p>
                        <p>{album.name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
