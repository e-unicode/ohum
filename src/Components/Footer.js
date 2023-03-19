import "./Footer.css";

function Footer(props) {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="footer-content">
          <p>
            지금 날씨 <span>{props.weather}</span>
          </p>
          <p>{props.now}</p>
          <p>
            오늘 음악 <span>{props.mood}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;