import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMusic, faCloud, faRightFromBracket, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function Banner() {
  return (
    <div className="buttons">
      <button>
        <span><FontAwesomeIcon icon={faHashtag} /></span>
        <p>오늘</p>
      </button>
      <button>
        <span><FontAwesomeIcon icon={faMusic} /></span>
        <p>음악</p>
      </button>
      <button>
        <span><FontAwesomeIcon icon={faCloud} /></span>
        <p>맑음</p>
      </button>
      <button>
        <span><FontAwesomeIcon icon={faNoteSticky} /></span>
        <p>마이페이지</p>
      </button>
      <button>
        <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
        <p>로그아웃</p>
      </button>
    </div>
  );
}

export default Banner;
