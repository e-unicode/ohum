import "./Footer.css";
import Loading from "./Loading";

function Footer(props) {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="footer-content">
          <p>
            지금 날씨 {props.weatherTag ? <span>{props.weather}</span> : <span>로드중</span>}
          </p>
          <p>{props.now}</p>
          <p>오늘 음악 {props.weatherTag ? <span>{props.currentMood}</span> : <span>추천중</span>}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
