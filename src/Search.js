import "./Search.css";

function Search() {
  return (
    <div className="search">
      <form action="/" method="POST">
        <div className="form">
          <input className="input" placeholder="SEARCH" required="" type="text" name="search" />
          <span className="input-border"></span>
        </div>
          <button className="enter" type="submit">Enter</button>
      </form>
    </div>
  );
}

export default Search;
