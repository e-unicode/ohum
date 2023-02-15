import "./Search.css";
import { useEffect, useState } from "react";

function Search() {
  return (
    <div className="search">
      <div className="form">
        <input className="input" placeholder="Search for" required="" type="input"/>
        <span className="input-border"></span>
      </div>
      <div>
        <button className="enter">Enter</button>
      </div>
    </div>
  );
}

export default Search;