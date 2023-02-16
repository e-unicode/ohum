import "./Search.css";
import { useEffect, useState } from "react";

function Search() {
  return (
    <div className="search">
      <form action="/" method="POST">
        <div className="form">
          <input className="input" placeholder="Search for" required="" type="text" name="search" />
          <span className="input-border"></span>
        </div>
        <div>
          <button className="enter" type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
}

export default Search;
