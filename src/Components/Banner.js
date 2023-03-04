import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMusic, faCloud, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="buttons">
      <Link to="/post" style={{ textDecoration: "none" }}>
        <button className="banner-btn">
          <span className="span-mother">
            <span>#</span>
            <span>오</span>
            <span>늘</span>
            <span>음</span>
            <span>악</span>
          </span>
          <span className="span-mother2">
            <span>#</span>
            <span>오</span>
            <span>늘</span>
            <span>음</span>
            <span>악</span>
          </span>
        </button>
      </Link>
      <Link to="/search" style={{ textDecoration: "none" }}>
        <button className="banner-btn">
          <span className="span-mother">
            <span>탐</span>
            <span>색</span>
          </span>
          <span className="span-mother2">
            <span>탐</span>
            <span>색</span>
          </span>
        </button>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="banner-btn">
          <span className="span-mother">
            <span>마</span>
            <span>이</span>
            <span>페</span>
            <span>이</span>
            <span>지</span>
          </span>
          <span className="span-mother2">
            <span>마</span>
            <span>이</span>
            <span>페</span>
            <span>이</span>
            <span>지</span>
          </span>
        </button>
      </Link>

      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="banner-btn">
          <span className="span-mother">
            <span>로</span>
            <span>그</span>
            <span>아</span>
            <span>웃</span>
          </span>
          <span className="span-mother2">
            <span>로</span>
            <span>그</span>
            <span>아</span>
            <span>웃</span>
          </span>
        </button>
      </Link>

      {/* <Link to="/search" style={{ textDecoration: "none" }}>
        <button>
          <span>
            <FontAwesomeIcon icon={faHashtag} />
          </span>
          <p>오늘</p>
        </button>
      </Link>
      <Link to="/post" style={{ textDecoration: "none" }}>
        <button>
          <span>
            <FontAwesomeIcon icon={faMusic} />
          </span>
          <p>음악</p>
        </button>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          <p>로그아웃</p>
        </button>
      </Link> */}
    </div>
  );
}

export default Banner;
