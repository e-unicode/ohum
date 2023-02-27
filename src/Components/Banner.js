import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMusic, faCloud, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Banner() {

  let navigate = useNavigate();

  return (
    <div className="buttons">
      <Link to="/search" style={{ textDecoration: "none" }}>
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
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <p>맑음</p>
        </button>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          <p>로그아웃</p>
        </button>
      </Link>
    </div>
  );
}

export default Banner;
